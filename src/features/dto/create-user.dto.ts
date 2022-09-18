import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @MinLength(6)
    @MaxLength(16)
    public readonly username: string;

    @MinLength(8)
    @MaxLength(20)
    public readonly password: string;

    @IsNotEmpty()
    public readonly email: string;
}