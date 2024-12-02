import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ImportDeckBatch } from "../schemas/import-deck-batch.schema";
import { ImportStatusEnum } from "../enums/import-status.enum";
import { ImportDeckBatchDto } from "../dtos/import-deck-batch.dto";

@Injectable()
export class ImportDeckBatchService {
    constructor(
        @InjectModel(ImportDeckBatch.name)
        private importDeckBatchModel: Model<ImportDeckBatch>
    ) { }

    async findAllImportDeckBatchesByImport(importDeckId: string): Promise<ImportDeckBatchDto[]> {
        const importDeckBatches = await this.importDeckBatchModel
            .find()
            .where({ importDeckId });

        return importDeckBatches.map(importDeckBatch => {
            return {
                cards: importDeckBatch.cards,
                status: [importDeckBatch.status.reduce((maior, atual) => {
                    return (!maior || atual.generatedAt > maior.generatedAt) ? atual : maior;
                }, null)]
            }
        })
    }

    async findById(importDeckId: string, importDeckBatchId: string): Promise<ImportDeckBatchDto> {
        return await this.importDeckBatchModel
            .findById(importDeckBatchId);
    }

    async updateStatus(importDeckBatchId: string, statusType: ImportStatusEnum, observation: string = null): Promise<void> {
        const importDeckBatch = await this.importDeckBatchModel.findById(importDeckBatchId);

        if (!importDeckBatch) {
            throw new NotFoundException(`Import deck batch with ID ${importDeckBatchId} not found`);
        }

        importDeckBatch.status.push({
            generatedAt: new Date(),
            observation: observation,
            status: statusType
        });

        await importDeckBatch.updateOne();
    }
}