import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty({
        description: 'The user email',
        example: 'Thiago@email.com',
    })
    email: string;

    @ApiProperty({
        description: 'The user username',
        example: 'Thiago',
    })
    username: string;

    @ApiProperty({
        description: 'The user password',
        example: 'senhaSecreta123',
    })
    password: string;
}