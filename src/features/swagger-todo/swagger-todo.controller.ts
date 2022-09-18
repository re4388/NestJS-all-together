import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTodoDto } from './dto/create-todo.dto';
import { SwaggerTodoService } from './swagger-todo.service';


// Basic Auth
// @ApiBasicAuth()
@ApiBearerAuth()
@ApiTags('Todo')
@Controller('swagger-todo')
export class SwaggerTodoController {
    constructor(private readonly todoService: SwaggerTodoService) { }

    // batch upload
    @ApiBody({ type: [CreateTodoDto] })
    @Post('bulk')
    createTodos(@Body() todos: CreateTodoDto[]) {
        return todos.map((todo) => this.todoService.createTodo(todo));
    }

    @ApiHeader({
        name: 'X-Custom',
        description: 'Try to set custom header.',
    })
    @Get(':id')
    getTodo(@Param('id') id: string) {
        return this.todoService.getTodo(id);
    }

    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'The todo has been successfully created.',
    })
    @Post()
    createTodo(@Body() data: CreateTodoDto) {
        return this.todoService.createTodo(data);
    }
}
