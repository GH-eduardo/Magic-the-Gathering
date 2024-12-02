import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Batch, BatchDocument } from './schemas/batch.schema';
import { Card, CardDocument } from './schemas/card.schema';
import { Importation, ImportationDocument } from './schemas/importation.schema';
import axios from 'axios';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectModel(Batch.name) private readonly batchModel: Model<BatchDocument>,
    @InjectModel(Card.name) private readonly cardModel: Model<CardDocument>,
    @InjectModel(Importation.name) private readonly importationModel: Model<ImportationDocument>
  ) {}

  async validateBatch(batchId: string) {
    try {
      const batch = await this.batchModel.findById(batchId).populate('cards').exec();
      const importationId = batch.importationId.toString();
      const commanderColors = await this.getCommanderColors(importationId);

      for (const card of batch.cards) {
        await this.validateCard(card as CardDocument, commanderColors);
      }
    
      this.logger.log(`Validação concluída para o lote ${batchId}.`);
    } catch (error) {
      this.logger.error(`Erro ao validar o lote ${batchId}: ${error.message}`, error.stack);
    }
  }

  private async getCommanderColors(importationId: string): Promise<string[] | null> {
    try {
      const importation = await this.importationModel.findById(importationId).exec();

      const commanderId = importation.commanderId;
      const commanderCard = await this.cardModel.findById(commanderId).exec();

      if (!commanderCard) {
        this.logger.error(`Carta do comandante com ID ${commanderId} não encontrada no banco.`);
        return null;
      }
      
      return commanderCard.color_identity;
    } catch (error) {
      this.logger.error(`Erro ao obter cores do comandante ${importationId}: ${error.message}`);
      return null;
    }
  }  

  private async validateCard(card: CardDocument, commanderColors: string[]) {
    try {
      let cardInDb = await this.cardModel.findById(card._id).exec();
  
      if (!cardInDb) {
        // cadastra a carta
      }

      if (this.isValidColor(cardInDb, commanderColors)) {
        this.markCardAsInvalid(cardInDb, 'Cor inválida para o comandante');
      }
    } catch (error) {
      this.logger.error(`Erro ao validar a carta ${card._id}: ${error.message}`, error.stack);
    }
  }

  private isValidColor(card: Card, commanderColors: string[]): boolean {
    return card.colors && Array.isArray(card.colors) && card.colors.every(color => commanderColors.includes(color));
  }

  private async markCardAsInvalid(card: CardDocument, reason: string) {
    this.logger.warn(`Carta ${card._id} marcada como inválida: ${reason}`);
    card.status = 'invalid';
    card.observations = reason;
    await card.save();
  }
}
