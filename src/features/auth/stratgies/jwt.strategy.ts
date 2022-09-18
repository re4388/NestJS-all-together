import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // 是否忽略過期的 JWT，預設是 false
            ignoreExpiration: false,
            secretOrKey: configService.get('secrets.jwt'),
        });
    }



    validate(payload: any) {
        // we already auth the use via jwt process
        // so no work here
        // we can surely do further check from db if needed 
        const { id, username } = payload;
        return { id, username };
    }
}