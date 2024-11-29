import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Deck } from "./schemas/deck.schema";
import { Model, ObjectId } from "mongoose";
import { CreateDeckDto } from "./dtos/create-deck.dto";
import { UpdateDeckDto } from "./dtos/update-deck.dto";
import { Card } from './schemas/card.schema';
import { ListDecksDto } from "./dtos/list-decks.dto";
import { ImportDeckDto } from "./dtos/import-deck.dto";
import { ExportDeckDto } from "./dtos/export-deck.dto";
import fetch from 'node-fetch';
import { UsersService } from "src/users/users.service";
import { Role } from "src/users/enums/role.enum";

@Injectable()
export class DecksService {
    constructor(
        @InjectModel(Deck.name)
        private deckModel: Model<Deck>,
        @InjectModel(Card.name)
        private cardModel: Model<Card>,
        private usersService: UsersService
    ) { }

    async create(createDeckDto: CreateDeckDto): Promise<{ message: string, deckId: string }> {
        const duplicatedDeck = await this.deckModel.findOne({ name: createDeckDto.name });

        if (duplicatedDeck) {
            throw new ConflictException("There is already a deck with the same name");
        }

        const commanderCard = await this.generateCommander(createDeckDto.commanderName);
        const cards = await this.generateCards(commanderCard.id);

        const createdDeck = new this.deckModel({
            name: createDeckDto.name,
            description: createDeckDto.description,
            commander: commanderCard,
            cards: cards,
            owner: createDeckDto.ownerId
        });

        const savedDeck = await createdDeck.save();

        return { message: "Deck created successfully", deckId: savedDeck._id.toString() };
    }


    async findById(id: ObjectId, userId: ObjectId): Promise<Deck> {
        const user = await this.usersService.findById(userId)

        const query = this.deckModel.findById(id)
            .populate('commander')
            .populate('cards');

        if (user.role != Role.ADMIN) {
            query.where({ owner: user.id });
        }

        const deck = await query.exec();

        if (!deck) {
            throw new NotFoundException(`Deck with ID ${id} not found`);
        }

        return deck;
    }

    async findAll(userId: ObjectId): Promise<ListDecksDto[]> {
        const user = await this.usersService.findById(userId)

        const decks = await this.deckModel.find()
            .populate('commander')
            .where({ owner: user.id })
            .exec();

        return decks.map(deck => ({
            deckId: deck._id.toString(),
            name: deck.name,
            description: deck.description,
            commanderImage: deck.commander.image_normal_uri || ''
        }));
    }

    async findAllAdmin(): Promise<ListDecksDto[]> {

        const decks = await this.deckModel.find()
            .populate('commander')
            .populate('owner')
            .exec();
        
        return decks.map(deck => ({
            deckId: deck._id.toString(),
            name: deck.name,
            description: deck.description,
            commanderImage: deck.commander.image_normal_uri || '',
            owner: deck.owner.username
        }));
    }

    async updateDeck(id: ObjectId, userId: ObjectId, updateDeckDto: UpdateDeckDto): Promise<void> {
        const deck = await this.findById(id, userId);
        deck.name = updateDeckDto.name;
        deck.description = updateDeckDto.description;
        await this.deckModel.findByIdAndUpdate(id, deck);
    }

    async removeDeck(id: ObjectId, userId: ObjectId): Promise<void> {
        const deck = await this.findById(id, userId);
        const result = await this.deckModel.deleteOne({ _id: deck.id });
        console.log(result)
    }

    async exportDeck(deckId: string): Promise<ExportDeckDto> {
        const deck = await this.deckModel.findById(deckId).populate('commander').populate('cards').exec();

        if (!deck) {
            throw new NotFoundException(`Deck with ID ${deckId} not found`);
        }

        return {
            name: deck.name,
            description: deck.description,
            commanderName: deck.commander.name,
            cardsNames: deck.cards.map(card => card.name)
        };
    }

    async importDeck(importDeckDto: ImportDeckDto): Promise<{ message: string, deckId: string }> {
        const { commanderName, cardsNames } = importDeckDto;

        const commanderCard = await this.generateCommander(commanderName);

        if (cardsNames.length !== 99) {
            throw new Error(`The deck must have exactly 99 cards beyond the commander card, but ${cardsNames.length} were provided.`);
        }

        const cards: Card[] = [];

        //leva em torno de 10 segundos para importar o deck
        for (let i= 0; i< cardsNames.length; i++) {
            const response = await fetch(`https://api.scryfall.com/cards/named/?exact=${encodeURIComponent(cardsNames[i])}`);
            //50 milisegundos de delay para não sobrecarregar a API (pediram na doc)
            await new Promise(r => setTimeout(r, 50));

            if (!response.ok) {
                throw new Error(`Error fetching cards: ${response.statusText}`);
            }
            const cardData = await response.json();
            cards.push(await this.mapToCard(cardData))
        } 

        const importedDeck = new this.deckModel({
            name: importDeckDto.name,
            description: importDeckDto.description,
            commander: commanderCard,
            cards: cards,
            owner: importDeckDto.ownerId
        });

        const savedDeck = await importedDeck.save();

        return { message: "Deck imported successfully", deckId: savedDeck._id.toString() };
    }


    private async generateCommander(commanderName: string): Promise<Card> {
        const url = `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(commanderName)}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error when searching the card: ${response.statusText}`);
        }

        const cardData = await response.json();

        if (cardData.legalities.commander !== 'legal') {
            throw new Error(`The card "${commanderName}" can't be used as a commander!`);
        }

        return this.mapToCard(cardData, true);
    }

    private async generateCards(commanderId: string): Promise<Card[]> {
        const commander = await this.cardModel.findOne({ _id: commanderId }).exec();

        if (!commander) {
            throw new NotFoundException(`Commander with ID ${commanderId} not found.`);
        }

        const colors = commander.color_identity.join('');
        const cards: Card[] = [];
        const response = await fetch(`https://api.scryfall.com/cards/search?q=color:${colors}&unique=cards`);

        if (!response.ok) {
            throw new Error(`Error fetching cards: ${response.statusText}`);
        }

        const cardData = await response.json();

        for (let card of cardData.data) {
            if (cards.length < 99) {
                cards.push(await this.mapToCard(card));
            } else {
                break;
            }
        }

        return cards;
    }

    private async mapToCard(cardData: any, isCommander: boolean = false): Promise<Card> {
        const card = new this.cardModel({
            id: cardData.id,
            oracle_id: cardData.oracle_id,
            name: cardData.name,
            released_at: cardData.released_at,
            uri: cardData.uri,
            image_normal_uri: cardData.image_uris?.normal || '',
            image_full_uri: cardData.image_uris?.art_crop || '',
            mana_cost: cardData.mana_cost,
            cmd: cardData.cmc,
            type_line: cardData.type_line,
            oracle_text: cardData.oracle_text,
            power: cardData.power,
            toughness: cardData.toughness,
            color_identity: cardData.color_identity,
            rarity: cardData.rarity,
            artist: cardData.artist,
            artist_ids: cardData.artist_ids?.[0] || '',
            illustration_id: cardData.illustration_id,
            edhrec_url: cardData.edhrec_url,
            rulings_uri: cardData.rulings_uri,
            is_commander: isCommander
        });

        return card.save();
    }
}
