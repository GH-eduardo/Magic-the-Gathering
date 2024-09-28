import { ApiProperty } from "@nestjs/swagger";

export class UpdateDeckDto {

    @ApiProperty({ 
        description: 'name/title of the deck',
        example: 'Novo nome do deck',
     })
    name?: string;

    @ApiProperty({ 
        description: 'description of the deck',
        example: 'Nova descrição do deck',
    })
    description?: string;
}
