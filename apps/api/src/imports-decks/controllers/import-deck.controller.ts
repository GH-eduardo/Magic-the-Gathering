import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { ImportDeckDto } from "src/imports-decks/dtos/import-deck.dto";
import { ImportDeckService } from "../services/import-deck.service";

@ApiBearerAuth()
@ApiTags('imports-decks')
@Controller('imports-decks')
export class ImportDeckController {
    constructor(
        private importDeckService: ImportDeckService) { }

    @ApiOperation({ summary: 'import deck by providing a json object' })
    @Post()
    async postImportDeck(@Req() request: Request, @Body() importDeckDto: ImportDeckDto) {
        const requestUser = request['user'];
        importDeckDto.ownerId = requestUser.id;

        return await this.importDeckService.importDeck(importDeckDto);
    }

    @ApiOperation({ summary: 'lists all imports decks of one user' })
    @Get()
    async getImportsDecks(@Req() request: Request) {
        const requestUser = request['user'];

        return await this.importDeckService.findAllImportDecks(requestUser.id);
    }

    @ApiOperation({ summary: 'get import deck by id' })
    @Get(':id')
    @ApiParam({ name: 'id' })
    async getImportDeckById(@Req() request: Request, @Param() params) {
        const requestUser = request['user'];

        return await this.importDeckService.findImportDeckById(params.id, requestUser.id);
    }
}