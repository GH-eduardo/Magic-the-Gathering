import { Bind, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, Res, UseInterceptors, UseGuards, Inject } from '@nestjs/common';
import { DecksService } from './deck.service';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateDeckDto } from './dtos/update-deck.dto';
import { DetailsDeckDto } from './dtos/details-deck.dto';
import { ListDecksDto } from './dtos/list-decks.dto';
import { ImportDeckDto } from './dtos/import-deck.dto';
import { ExportDeckDto } from './dtos/export-deck.dto';
import { Request, Response } from 'express';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Roles } from 'src/auth/cross-cutting/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
import { RolesGuard } from 'src/auth/cross-cutting/guards/roles.guard';
import { ImportationMessagingService } from 'src/importations/services/importation-messaging.service';

@ApiBearerAuth()
@ApiTags('decks')
@UseInterceptors(CacheInterceptor)
@Controller('decks')
export class DecksController {
    constructor(
        @Inject()
        private importationMessagingService: ImportationMessagingService,
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
        console.log(updateDeckDto)
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
    @Post('import')
    async importDeck(@Req() request: Request, @Body() importDeckDto: ImportDeckDto) {
        const requestUser = request['user'];
        importDeckDto.ownerId = requestUser.id;

        return await this.deckService.importDeck(importDeckDto);
    }
}
