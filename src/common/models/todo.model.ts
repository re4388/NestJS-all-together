import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MooUser } from './Moouser.model';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {

    @Prop({ required: true, maxlength: 20 })
    title: string;

    @Prop({ maxlength: 200 })
    description: string;

    @Prop({ required: true })
    completed: boolean;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    owner: MooUser;

}

export const TodoSchema = SchemaFactory.createForClass(Todo);

// export interface Todo {
//     userId: number;
//     id: number;
//     title: string;
//     completed: boolean;
// }

