import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MooUser, UserDocument, UserSchema } from 'src/common/models/Moouser.model';
import { UserController } from './mooUser.controller';
import { UserService } from './mooUser.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: MooUser.name,
        useFactory: () => {
          UserSchema.pre('save', function (this: UserDocument, next) {
            console.log("mongo pre hook", this);
            next();
          });
          return UserSchema;
        }
      }
    ])
    // MongooseModule.forFeature([
    //   { name: User.name, schema: UserSchema }
    // ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class MooUserModule { }
