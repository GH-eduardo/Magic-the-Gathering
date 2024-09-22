import { Bind, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { DecksService } from './deck.service';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateDeckDto } from './dtos/update-deck.dto';
import { Deck } from './schemas/deck.schema';
import { DetailsDeckDto } from './dtos/details-deck.dto';
import { ListDecksDto } from './dtos/list-decks.dto';
import { ExportDeckDto } from './dtos/export-deck.dto';
import { Request, Response } from 'express';

@ApiBearerAuth()
@ApiTags('decks')
@Controller('decks')
export class DecksController {
    constructor(
        private deckService: DecksService) { }

    @Get()
    async getDecks(@Req() request: Request): Promise<ListDecksDto[]> {
        return await this.deckService.findAll(request['user'].id);
    }

    @Get(':id')
    async getDeckById(@Req() request: Request, @Param() params): Promise<DetailsDeckDto> {
        const deckData = await this.deckService.findById(params.id, request['user'].id);
        return DetailsDeckDto.fromEntity(deckData);
    }

    @Post()
    async postDeck(@Req() request: Request, @Body() createDeckDto: CreateDeckDto) {
        const requestUser = request['user'];
        createDeckDto.ownerId = requestUser.id;
        return await this.deckService.create(createDeckDto);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateDeck(@Req() request: Request, @Res() response: Response, @Param() params, @Body() updateDeckDto: UpdateDeckDto): Promise<Response> {
        await this.deckService.updateDeck(params.id, request['user'].id, updateDeckDto);
        return response.sendStatus(HttpStatus.NO_CONTENT);
    }

    @Delete(':id')
    async removeDeck(@Req() request: Request, @Param() params): Promise<{ message: string }> {
        await this.deckService.removeDeck(params.id ,request['user'].id);
        return { message: `Deck with ID ${params.id} successfully removed.` };
    }

    @Get(':id/export')
    @Bind(Param('id'))
    async exportDeck(id: string): Promise<ExportDeckDto> {
        return this.deckService.exportDeck(id);
    }

    @Post('import')
    async importDeck(@Body() importDeckDto: ExportDeckDto): Promise<Deck> {
        return this.deckService.importDeck(importDeckDto);
    }
}
