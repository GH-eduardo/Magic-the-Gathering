import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Card } from "./schemas/card.schema";
import { Model } from "mongoose";
import { CardDto } from "./dtos/card.dto";

const apiUrl = 'https://api.scryfall.com'

@Injectable()
export class CardsService {
    constructor(
        @InjectModel(Card.name)
        private cardModel: Model<Card>
    ) { }

    async create(cardDto: CardDto) {
        const duplicatedCard = await this.cardModel.findOne({ name: cardDto.name })

        if (duplicatedCard) {
            throw new ConflictException("This card already exist");
        }
    }
    
    async findAll(): Promise<Card []> {
        return this.cardModel.find().exec();
    }

    async searchCardByName(cardName: String) {
        const savedCard = await this.cardModel.findOne({ name: cardName })

        if (savedCard) {
            return savedCard;
        }

        const cardData = fetch(apiUrl + '/cards/named?exact=' + cardName)
        const card = new this.cardModel(cardData)
        return card
    }

}