import { Bind, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { DecksService } from './deck.service';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateDeckDto } from './dtos/update-deck.dto';
import { Deck } from './schemas/deck.schema';
import { DetailsDeckDto } from './dtos/details-deck.dto';
import { ListDecksDto } from './dtos/list-decks.dto';
import { ExportDeckDto } from './dtos/export-deck.dto';
import { Request, Response } from 'express';
import { Roles } from 'src/auth/cross-cutting/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
import { RolesGuard } from 'src/auth/cross-cutting/guards/roles.guard';

@ApiBearerAuth()
@ApiTags('decks')
@Controller('decks')
export class DecksController {
    constructor(
        private deckService: DecksService) { }

    @ApiOperation({ summary: 'lists all decks of one user' })
    @Get()
    async getDecks(@Req() request: Request): Promise<ListDecksDto[]> {
        return await this.deckService.findAll(request['user'].id);
    }

    @ApiOperation({ summary: 'lists all decks of all users' })
    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Get('/admin')
    async getAllDecks(): Promise<ListDecksDto[]> {
        return await this.deckService.findAllAdmin();
    }

    @ApiOperation({ summary: 'get deck by id' })
    @Get(':id')
    @ApiParam({ name: 'id', description: 'deck id', example: '5f9d7b3b9f6b6b001f3b3b3b' })
    async getDeckById(@Req() request: Request, @Param() params): Promise<DetailsDeckDto> {
        const deckData = await this.deckService.findById(params.id, request['user'].id);
        return DetailsDeckDto.fromEntity(deckData);
    }

    @ApiOperation({ summary: 'create a new deck' })
    @Post()
    async postDeck(@Req() request: Request, @Body() createDeckDto: CreateDeckDto) {
        const requestUser = request['user'];
        createDeckDto.ownerId = requestUser.id;
        return await this.deckService.create(createDeckDto);
    }

    @ApiOperation({ summary: 'update deck by id' })
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiParam({ name: 'id', description: 'deck id', example: '5f9d7b3b9f6b6b001f3b3b3b' })
    @Patch(':id')
    async updateDeck(@Req() request: Request, @Res() response: Response, @Param() params, @Body() updateDeckDto: UpdateDeckDto): Promise<Response> {
        await this.deckService.updateDeck(params.id, request['user'].id, updateDeckDto);
        return response.sendStatus(HttpStatus.NO_CONTENT);
    }

    @ApiOperation({ summary: 'delete deck by id' })
    @ApiParam({ name: 'id', description: 'deck id', example: '5f9d7b3b9f6b6b001f3b3b3b' })
    @Delete(':id')
    async removeDeck(@Req() request: Request, @Param() params): Promise<{ message: string }> {
        await this.deckService.removeDeck(params.id ,request['user'].id);
        return { message: `Deck with ID ${params.id} successfully removed.` };
    }

    @ApiOperation({ summary: 'export deck by id' })
    @ApiParam({ name: 'id', description: 'deck id', example: '5f9d7b3b9f6b6b001f3b3b3b' })
    @Get(':id/export')
    @Bind(Param('id'))
    async exportDeck(id: string): Promise<ExportDeckDto> {
        return this.deckService.exportDeck(id);
    }

    @ApiOperation({ summary: 'import deck by providing a json object' })
    @ApiBody({
        description: 'provide below the deck json object',
        schema: {
            example: {
                name: 'deck de Dina',
                description: 'deck de controle',
                commander: {
                    id: '5f9d7b3b9f6b6b001f3b3b3b',
                    name: 'Dina, Soul Steeper',
                    imageUri: 'https://cards.scryfall.io/normal/front/9/c/9cd2b567-0cf7-4441-b3ce-e31141dd91c8.jpg?1627428607'
                },
                cards: [
                    {
                        id: '66f4297e6a60bacc2c64c007',
                        name: 'Abomination of Gudul',
                        imageUri: 'https://cards.scryfall.io/normal/front/7/d/7df9759e-1072-4a6a-be57-f73b15bf3847.jpg?1562789157'
                    },
                    {
                        id: '66f4297e6a60bacc2c64c009',
                        name: 'Abomination of Llanowar',
                        imageUri: 'https://cards.scryfall.io/normal/front/4/b/4b68bc46-5591-44dd-becc-eca154066925.jpg?1631235320'
                    }
                ]
            }
        }
    })
    @Post('import')
    async importDeck(@Body() importDeckDto: ExportDeckDto): Promise<Deck> {
        return this.deckService.importDeck(importDeckDto);
    }
}
