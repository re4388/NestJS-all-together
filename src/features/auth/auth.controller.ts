import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserService } from '../authUser/authUser.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UserDocument } from 'src/common/models/user.model';

@Controller('auth')
export class AuthController {


    constructor(
        private readonly authuserService: AuthUserService,
        private readonly authService: AuthService,
    ) { }

    @Post('/signup')
    signup(@Body() user: CreateUserDto) {
        return this.authuserService.createUser(user);
    }

    @UseGuards(AuthGuard('local'))
    @Post('/signin')
    signin(@Req() request: Request) {
        return this.authService.generateJwt(request.user as UserDocument);
    }
    // @UseGuards(AuthGuard('local'))
    // @Post('/signin')
    // signin(@Req() request: Request) {
    //     return request.user;
    // }
}
