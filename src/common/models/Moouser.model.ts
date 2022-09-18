import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = MooUser & Document;

@Schema()
export class MooUser {

    @Prop(
        raw({
            firstName: { type: String },
            lastName: { type: String },
            fullName: { type: String }
        })
    )
    name: Record<string, any>;

    @Prop({ required: true })
    email: string;

}

export const UserSchema = SchemaFactory.createForClass(MooUser);