import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthuserService } from '../authuser/authuser.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {


    constructor(private readonly authuserService: AuthuserService) { }

    @Post('/signup')
    signup(@Body() user: CreateUserDto) {
        return this.authuserService.createUser(user);
    }

    @UseGuards(AuthGuard('local'))
    @Post('/signin')
    signin(@Req() request: Request) {
        return request.user;
    }
}
