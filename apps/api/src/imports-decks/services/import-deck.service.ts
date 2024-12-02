import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Card } from "src/decks/schemas/card.schema";
import { Deck } from "src/decks/schemas/deck.schema";
import { ImportDeckDto } from "../dtos/import-deck.dto";
import { DecksService } from "src/decks/deck.service";
import { ImportStatusEnum } from "../enums/import-status.enum";
import { ImportDeck } from "../schemas/import-deck.schema";
import { ImportDeckBatch } from "../schemas/import-deck-batch.schema";
import { UsersService } from "src/users/users.service";
import { Role } from "src/users/enums/role.enum";

@Injectable()
export class ImportDeckService {
    constructor(
        @InjectModel(Deck.name)
        private deckModel: Model<Deck>,
        @InjectModel(ImportDeck.name)
        private importDeckModel: Model<ImportDeck>,
        @InjectModel(ImportDeckBatch.name)
        private importDeckBatchModel: Model<ImportDeckBatch>,
        private decksService: DecksService,
        private usersService: UsersService
    ) { }

    async importDeck(importDeckDto: ImportDeckDto): Promise<{ deckId: string }> {
        const { commanderName, cardsNames } = importDeckDto;

        const commanderCard = await this.decksService.generateCommander(commanderName);

        if (cardsNames.length !== 99) {
            throw new Error(`The deck must have exactly 99 cards beyond the commander card, but ${cardsNames.length} were provided.`);
        }

        const cards: Card[] = [];

        //leva em torno de 10 segundos para importar o deck
        for (let i = 0; i < cardsNames.length; i++) {
            const response = await fetch(`https://api.scryfall.com/cards/named/?exact=${encodeURIComponent(cardsNames[i])}`);
            //50 milisegundos de delay para não sobrecarregar a API (pediram na doc)
            await new Promise(r => setTimeout(r, 50));

            if (!response.ok) {
                throw new Error(`Error fetching cards: ${response.statusText}`);
            }
            const cardData = await response.json();
            cards.push(await this.decksService.mapToCard(cardData))
        }

        const newStatus = {
            status: ImportStatusEnum.CREATED,
            generatedAt: new Date(),
            observation: 'Initial validation was successful (valid commander and more 99 existing cards)'
        }

        const newBatchStatus = {
            status: ImportStatusEnum.CREATED,
            generatedAt: new Date(),
        }

        const cardIds = cards.map(card => card.id);

        const batch1 = { cards: cardIds.slice(0, 20), status: [newBatchStatus] };
        const batch2 = { cards: cardIds.slice(20, 40), status: [newBatchStatus] };
        const batch3 = { cards: cardIds.slice(40, 60), status: [newBatchStatus] };
        const batch4 = { cards: cardIds.slice(60, 80), status: [newBatchStatus] };
        const batch5 = { cards: cardIds.slice(80, 99), status: [newBatchStatus] };

        const allBatches = [batch1, batch2, batch3, batch4, batch5];

        const newImportation = new this.importDeckModel({
            commanderName: commanderName,
            status: [newStatus],
            owner: importDeckDto.ownerId
        });

        await newImportation.save();
        const importationWithImportationIdAddedOnBatches = await this.importDeckModel.findById(newImportation.id);

        for (let i = 0; i < allBatches.length; i++) {
            const newBatch = new this.importDeckBatchModel({
                cards: allBatches[i].cards,
                status: allBatches[i].status,
                importationId: newImportation.id
            });
            await newBatch.save();
            importationWithImportationIdAddedOnBatches.batches.push(newBatch);
        }
        await this.importDeckModel.findByIdAndUpdate(newImportation.id, importationWithImportationIdAddedOnBatches);

        const importedDeck = new this.deckModel({
            name: importDeckDto.name,
            description: importDeckDto.description,
            commander: commanderCard,
            cards: cards,
            owner: importDeckDto.ownerId
        });

        const savedDeck = await importedDeck.save();

        return { deckId: savedDeck._id.toString() };
    }

    async findAllImportDecks(userId: ObjectId): Promise<ImportDeckDto[]> {
        const user = await this.usersService.findById(userId)

        const importsDecks = await this.importDeckModel.find()
            .where({ owner: user.id })
            .exec();

        return importsDecks.map(importDeck => ({
            id: importDeck.id,
            commanderName: importDeck.commanderName,
            name: importDeck.name,
            description: importDeck.description,
            ownerId: user.id,
            cardsNames: []
        }));
    }

    async findImportDeckById(importDeckId: string, userId: ObjectId): Promise<ImportDeck> {
        const user = await this.usersService.findById(userId);

        const query = this.importDeckModel.findById(importDeckId);

        if (user.role != Role.ADMIN) {
            query.where({ owner: user.id });
        }

        const importDeck = await query.exec();

        if (!importDeck) {
            throw new NotFoundException(`Import deck with ID ${importDeckId} not found`);
        }

        return importDeck;
    }
}