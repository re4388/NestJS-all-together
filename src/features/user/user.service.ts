import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/common/models/user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) { }

    removeById(id: string) {
        return this.userModel.remove({ _id: id });
    }

    updateById(id: string, data: any) {
        // new 參數是讓 mongoose 回傳更新後的結果，預設為 false
        return this.userModel.findByIdAndUpdate(id, data, { new: true });
    }

    create(user: any) {
        return this.userModel.create(user);
    }

    findById(id: string) {
        return this.userModel.findById(id);
    }
}
