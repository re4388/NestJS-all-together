import { ApiProperty } from '@nestjs/swagger';
import { TodoPriority } from '../types/priority.type';

export class CreateTodoDto {
    @ApiProperty({
        maxLength: 20,
        description: 'Todo 的標題',
    })
    title: string;

    @ApiProperty({
        maxLength: 200,
        description: '描述該 Todo 的細節',
    })
    description: string;

    @ApiProperty({
        description: '是否完成該 Todo',
    })
    completed: boolean;

    @ApiProperty({
        type: [String],
        description: '賦予該 Todo 標籤',
    })
    tags: string[];

    @ApiProperty({
        enum: TodoPriority,
        // add this to make this as a schema
        enumName: 'TodoPriority',
        description: '設置該 Todo 的優先權',
    })
    priority: TodoPriority;

    // 2d array
    @ApiProperty({
        type: 'array',
        items: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    })
    something: string[][];
}