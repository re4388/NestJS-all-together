import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class MockDto {
    @IsString()
    @IsNotEmpty()
    public readonly information: string;
}

export class UpdateTodoDto extends IntersectionType(CreateTodoDto, MockDto) {
}