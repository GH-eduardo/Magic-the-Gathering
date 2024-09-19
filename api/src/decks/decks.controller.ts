import { Body, Controller, Inject, Post } from '@nestjs/common';
import { DecksService } from './deck.service';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('decks')
@Controller('decks')
export class DecksController {
    constructor(private deckService: DecksService) { }
    
    @Post()
    postDeck(@Body() createDeckDto: CreateDeckDto) {
        return this.deckService.create(createDeckDto);
    }
}
