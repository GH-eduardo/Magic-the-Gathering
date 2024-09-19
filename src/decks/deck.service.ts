import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Deck } from "./schemas/deck.schema";
import { Model, ObjectId } from "mongoose";
import { CreateDeckDto } from "./dtos/create-deck.dto";

@Injectable()
export class DecksService {
    constructor(
        @InjectModel(Deck.name)
        private deckModel: Model<Deck>
    ) { }

    async create(createDeckDto: CreateDeckDto): Promise<Deck> {
        const duplicatedDeck = await this.deckModel.findOne({ name: createDeckDto.name });
        const deckName = createDeckDto.name;
        const commanderCardId = this.generateCommander(createDeckDto.commanderName);
        const cardsIds = this.generateCards(commanderCardId);

        if (duplicatedDeck) {
            throw new ConflictException("There is already a deck with the same name");
        }
        
        const createdDeck = new this.deckModel(deckName, commanderCardId, cardsIds);
        return createdDeck.save();
    }

    async findById(id: ObjectId): Promise<Deck> {
        return this.deckModel.findById(id);
    }

    async findAll(): Promise<Deck[]> {
        return this.deckModel.find().exec();
    }

    private async generateCommander(commanderName) {
    }

    private async generateCards(commanderId) {  
    }
}