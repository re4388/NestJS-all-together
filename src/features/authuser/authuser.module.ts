import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDefinition } from 'src/common/models/user.model';
import { AuthuserService } from './authuser.service';

@Module({
  imports: [MongooseModule.forFeature([UserDefinition])],
  providers: [AuthuserService],
  exports: [AuthuserService],
})
export class AuthuserModule { }
