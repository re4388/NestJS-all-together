import { Injectable } from '@nestjs/common';
import { CommonUtility } from 'src/core/utils/common.utility';
import { AuthuserService } from '../authuser/authuser.service';

@Injectable()
export class AuthService {
    constructor(private readonly authUserService: AuthuserService) { }

    async validateUser(username: string, password: string) {
        const user = await this.authUserService.findUser({ username });
        const { hash } = CommonUtility.encryptBySalt(password, user?.password?.salt);
        if (!user || hash !== user?.password?.hash) {
            return null;
        }
        return user;
    }
}
