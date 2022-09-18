import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthUserModule } from '../authUser/authUser.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule,
    AuthUserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get('secrets.jwt');
        return {
          secret,
          // 詳細的 JwtModule 配置項請參考 官方文件 以及 node-jsonwebtoken
          // https://github.com/nestjs/jwt/blob/master/README.md
          // https://github.com/auth0/node-jsonwebtoken#usage
          signOptions: {
            expiresIn: '60s'
          }
        };
      },
    })

  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule { }
