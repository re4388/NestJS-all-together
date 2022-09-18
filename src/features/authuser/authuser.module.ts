import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDefinition } from 'src/common/models/user.model';
import { AuthUserService } from './authUser.service';

@Module({
  imports: [MongooseModule.forFeature([UserDefinition])],
  providers: [AuthUserService],
  exports: [AuthUserService],
})
export class AuthUserModule { }
