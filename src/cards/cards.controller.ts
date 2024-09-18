import { Bind, Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { CardDto } from './dtos/card.dto';

@ApiBearerAuth()
@ApiTags('cards')
@Controller('cards')
export class CardsController {
    constructor(private cardService: CardsService) { }

    @Get()
    getCards() {
        return this.cardService.findAll();
    }

    @Get('/search/:cardName')
    @Bind(Param('cardName'))
    searchCard(cardName: String) {
        return this.cardService.searchCardByName(cardName);
    }

    @Post()
    createCard(@Body() cardDto: CardDto) {
        return this.cardService.create(cardDto)
    }

}
