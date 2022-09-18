import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthuserModule } from '../authuser/authuser.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './stratgies/local.strategy';

@Module({
  imports: [PassportModule, AuthuserModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule { }
