import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        minLength: 6,
        maxLength: 16,
        description: 'user desc test',
    })
    @MinLength(6)
    @MaxLength(16)
    public readonly username: string;

    @ApiProperty({
        minLength: 8,
        maxLength: 20,
        description: 'password desc test',
    })
    @MinLength(8)
    @MaxLength(20)
    public readonly password: string;

    @ApiProperty({
        description: 'email desc test',
    })
    @IsNotEmpty()
    public readonly email: string;
}