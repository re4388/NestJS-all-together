import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/common/models/user.model';
import { CommonUtility } from 'src/core/utils/common.utility';
import { AuthUserService } from '../authUser/authUser.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly authUserService: AuthUserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string) {
        const user = await this.authUserService.findUser({ username });
        const { hash } = CommonUtility.encryptBySalt(password, user?.password?.salt);
        if (!user || hash !== user?.password?.hash) {
            return null;
        }
        return user;
    }

    generateJwt(user: UserDocument) {
        const { _id: id, username } = user;
        const payload = { id, username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
