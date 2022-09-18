import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
    todos = [
        {
            id: 1,
            title: 'Ironman 13th',
            completed: false,
        },
        {
            id: 2,
            title: 'Study NestJS',
            completed: true,
        },
    ];

    findById(id: string) {
        return this.todos.find((todo) => todo.id === Number(id));
    }

    updateById(id: string, data: any) {
        const todo = this.findById(id);
        return Object.assign(todo, data);
    }

    removeById(id: string) {
        const idx = this.todos.findIndex((todo) => todo.id === Number(id));
        this.todos.splice(idx, 1);
    }


}
