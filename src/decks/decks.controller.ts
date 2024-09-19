import { Bind, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DecksService } from './deck.service';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('decks')
@Controller('decks')
export class DecksController {
    constructor(private deckService: DecksService) { }

    // Listar os decks
    @Get()
    getDecks() {
        return this.deckService.findAll();
    }

    // Mostrar detalhes incluindo dados
    // Nome, id, ImagemUlr
    @Get(':id')
    @Bind(Param())
    getDeckById(params) {
        return this.deckService.findById(params.id)
    }
    
    // Generate Randomly
    @Post()
    postDeck(@Body() createDeckDto: CreateDeckDto) {
        return this.deckService.create(createDeckDto);
    }

    // Editar deck (nome, descrição) - Patch

    // Delete deck

    // Exportar deck

    // Importar deck

}
