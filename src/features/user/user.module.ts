import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from 'src/common/models/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
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
export class UserModule { }
