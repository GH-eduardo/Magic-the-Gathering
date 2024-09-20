import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Deck } from "./schemas/deck.schema";
import { Model, ObjectId } from "mongoose";
import { CreateDeckDto } from "./dtos/create-deck.dto";
import fetch from 'node-fetch';
import { Card } from './schemas/card.schema';

@Injectable()
export class DecksService {
    constructor(
        @InjectModel(Deck.name)
        private deckModel: Model<Deck>,
        @InjectModel(Card.name)
        private cardModel: Model<Card>
    ) {}

    async create(createDeckDto: CreateDeckDto): Promise<Deck> {
        const duplicatedDeck = await this.deckModel.findOne({ name: createDeckDto.name });
        const deckName = createDeckDto.name;

        if (duplicatedDeck) {
            throw new ConflictException("There is already a deck with the same name");
        }

        const commanderCard = await this.generateCommander(createDeckDto.commanderName);
        const cards = await this.generateCards(commanderCard.id);

        const createdDeck = new this.deckModel({
            name: deckName,
            description: createDeckDto.description,
            commander: commanderCard,
            cards: cards
        });

        return createdDeck.save();
    }

    async findById(id: ObjectId): Promise<Deck> {
        return this.deckModel.findById(id).populate('commander').populate('cards').exec();
    }

    async findAll(): Promise<Deck[]> {
        return this.deckModel.find().populate('commander').populate('cards').exec();
    }

    private async generateCommander(commanderName: string): Promise<Card> {
        const url = `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(commanderName)}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro ao buscar a carta: ${response.statusText}`);
        }
    
        const cardData = await response.json();

        if (cardData.legalities.commander !== 'legal') {
            throw new Error(`A carta "${commanderName}" não é legal para ser usada como comandante.`);
        }
    
        return this.mapToCard(cardData, true);
    }

    private async generateCards(commanderId: string): Promise<Card[]> {
        const cards: Card[] = [];

        for (let i = 0; i < 99; i++) {
            const response = await fetch('https://api.scryfall.com/cards/random');
            const cardData = await response.json();
            cards.push(await this.mapToCard(cardData));
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
            image_nomral_uri: cardData.image_uris?.normal || '',
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
