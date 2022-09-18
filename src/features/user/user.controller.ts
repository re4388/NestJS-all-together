import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }


    @Delete(':id')
    removeById(@Param('id') id: string) {
        return this.userService.removeById(id);
    }

    @Patch(':id')
    updateById(
        @Param('id') id: string,
        @Body() body: any
    ) {
        return this.userService.updateById(id, body);
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.userService.findById(id);
    }

    @Post()
    create(@Body() body: any) {
        return this.userService.create(body);
    }
}
