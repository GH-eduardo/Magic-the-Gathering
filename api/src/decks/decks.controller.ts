import { Bind, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DecksService } from './deck.service';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateDeckDto } from './dtos/update-deck.dto';
import { Deck } from './schemas/deck.schema';
import { DetailsDeckDto } from './dtos/details-deck.dto';
import { ListDecksDto } from './dtos/list-decks.dto';
import { ExportDeckDto } from './dtos/ExportDeckDto.dto';

@ApiBearerAuth()
@ApiTags('decks')
@Controller('decks')
export class DecksController {
    constructor(private deckService: DecksService) { }

    @Get()
    getDecks(): Promise<ListDecksDto[]> {
        return this.deckService.findAll();
    }

    @Get(':id')
    @Bind(Param())
    getDeckById(params): Promise<DetailsDeckDto> {
        return this.deckService.findById(params.id)
    }

    @Post()
    postDeck(@Body() createDeckDto: CreateDeckDto) {
        return this.deckService.create(createDeckDto);
    }

    @Patch(':id')
    @Bind(Param(), Body())
    async updateDeck(params, updateDeckDto: UpdateDeckDto): Promise<Deck> {
        return this.deckService.updateDeck(params.id, updateDeckDto);
    }

    @Delete(':id')
    @Bind(Param('id'))
    async removeDeck(id: string): Promise<{ message: string }> {
        await this.deckService.removeDeck(id);
        return { message: `Deck with ID ${id} successfully removed.` };
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
