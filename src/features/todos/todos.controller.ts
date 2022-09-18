import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { RoleGuard } from '../../common/guards/role.guard';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) { }

    @UseGuards(RoleGuard)
    @Get(':id')
    getTodo(@Param('id') id: string) {
        return this.todosService.findById(id);
    }

    @UseGuards(RoleGuard)
    @Patch(':id')
    updateTodo(@Param('id') id: string, @Body() body: any) {
        return this.todosService.updateById(id, body);
    }

    @UseGuards(RoleGuard)
    @Delete(':id')
    removeTodo(@Param('id') id: string) {
        this.todosService.removeById(id);
        return this.todosService.todos;
    }


}
