import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UserDocument, USER_MODEL_TOKEN } from 'src/common/models/user.model';
import { CommonUtility } from 'src/core/utils/common.utility';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class AuthuserService {


    constructor(
        @InjectModel(USER_MODEL_TOKEN)
        private readonly userModel: Model<UserDocument>,
    ) { }

    createUser(user: CreateUserDto) {
        const { username, email } = user;
        const password = CommonUtility.encryptBySalt(user.password);
        return this.userModel.create({
            username,
            email,
            password,
        });
    }

    findUser(filter: FilterQuery<UserDocument>) {
        return this.userModel.findOne(filter).exec();
    }

}
