import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class SwaggerTodoService {

    todos = [
        {
            id: 1,
            title: 'Ironman 13th',
            description: 'NestJS tutorial.',
            completed: false,
        },
    ];

    createTodo(data: CreateTodoDto) {
        const todo = { id: this.todos.length + 1, ...data };
        this.todos.push(todo);
        return todo;
    }


    getTodo(id: string) {
        return this.todos.find((todo) => todo.id.toString() === id);
    }

}
