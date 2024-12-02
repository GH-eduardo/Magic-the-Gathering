import { Controller, Get, Param, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { ImportDeckBatchService } from "../services/import-deck-batch.service";

@ApiBearerAuth()
@ApiTags('imports-decks-batches')
@Controller('imports-decks/:importDeckId/batches')
export class ImportDeckBatchController {
    constructor(
        private importDeckBatchService: ImportDeckBatchService) { }

    @ApiOperation({ summary: 'lists all imports decks batches of one user' })
    @ApiParam({ name: 'importDeckId', description: 'ID of the import deck', type: String })
    @Get()
    async getImportsDecks(@Param('importDeckId') importDeckId: string) {
        return await this.importDeckBatchService.findAllImportDeckBatchesByImport(importDeckId);
    }

    @ApiOperation({ summary: 'get import deck batch by id' })
    @Get(':id')
    @ApiParam({ name: 'id', type: String })
    @ApiParam({ name: 'importDeckId', description: 'ID of the import deck', type: String })
    async getImportDeckById(@Param('importDeckId') importDeckId: string, @Param('id') id: string) {
        return await this.importDeckBatchService.findById(importDeckId, id);
    }
}