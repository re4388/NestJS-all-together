import { ModelDefinition, Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({
        required: true,
        minlength: 6,
        maxlength: 16
    })
    username: string;

    @Prop({
        required: true
    })
    email: string;

    @Prop({
        type: raw({
            hash: String,
            salt: String
        }),
        required: true
    })
    password: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const USER_MODEL_TOKEN = User.name;

export const UserDefinition: ModelDefinition = {
    name: USER_MODEL_TOKEN,
    schema: UserSchema,
};