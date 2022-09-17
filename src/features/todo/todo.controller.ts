import { Body, Controller, Get, HttpStatus, NotAcceptableException, Param, ParseArrayPipe, Patch, Post, Query, UsePipes, ValidationError, ValidationPipe } from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {

    constructor(
        private readonly todoService: TodoService
    ) { }

    @Get()
    getAll() {
        return [];
    }

    @Get(':id')
    get(@Param('id') id: string) {
        return { id };
    }

    // @Patch(':id')
    // @UsePipes(ValidationPipe)
    // update(
    //     @Param('id') id: number,
    //     @Body() dto: UpdateTodoDto
    // ) {
    //     return {
    //         id,
    //         ...dto
    //     };
    // }

    // @Patch(':id')
    // @UsePipes(ValidationPipe)
    // update(
    //     @Param('id') id: number,
    //     @Body() dto: UpdateTodoDto
    // ) {
    //     return {
    //         id,
    //         ...dto
    //     };
    // }


    // @Get()
    // get(
    //     @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
    //     ids: number[]
    // ) {
    //     return ids;
    // }

    // @Post()
    // create(
    //     @Body(new ParseArrayPipe({ items: CreateTodoDto }))
    //     dtos: CreateTodoDto[]
    // ) {
    //     return dtos;
    // }


    // @Get(':id')
    // @UsePipes(new ValidationPipe({ transform: true }))
    // get(@Param('id') id: number) {
    //     console.log(typeof id);
    //     return '';
    // }

    // @Post()
    // @UsePipes(new ValidationPipe({ transform: true }))
    // create(@Body() dto: CreateTodoDto) {
    //     console.log(dto);
    //     return dto;
    // }

    // @Post()
    // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    // create(@Body() dto: CreateTodoDto) {
    //     return {
    //         id: 1,
    //         ...dto
    //     };
    // }

    // @Post()
    // @UsePipes(new ValidationPipe({ whitelist: true }))
    // create(@Body() dto: CreateTodoDto) {
    //     return {
    //         id: 1,
    //         ...dto
    //     };
    // }

    // @Post()
    // @UsePipes(
    //     new ValidationPipe({
    //         exceptionFactory: (errors: ValidationError[]) => {
    //             return new NotAcceptableException({
    //                 code: HttpStatus.NOT_ACCEPTABLE,
    //                 message: '格式錯誤',
    //                 errors
    //             });
    //         }
    //     })
    // )
    // create(@Body() dto: CreateTodoDto) {
    //     return {
    //         id: 1,
    //         ...dto
    //     };
    // }



    // @Post()
    // @UsePipes(new ValidationPipe({ disableErrorMessages: true }))
    // create(@Body() dto: CreateTodoDto) {
    //     return {
    //         id: 1,
    //         ...dto
    //     };
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // create(@Body() dto: CreateTodoDto) {
    //     return {
    //         id: 1,
    //         ...dto
    //     };
    // }


    // @Get()
    // getAll() {
    //     return this.todoService.getTodos();
    // }





}
