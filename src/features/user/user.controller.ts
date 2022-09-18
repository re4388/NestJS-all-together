import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserService } from '../authUser/authUser.service';

@Controller('user')
export class UserController {


    constructor(private readonly authUserService: AuthUserService) { }


    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async getUser(@Param('id') id: string) {
        const user = await this.authUserService.findUser({ _id: id });
        const { password, ...others } = user.toJSON();
        return others;
    }
}
