import { Module } from '@nestjs/common';
import { TodoModule } from '../todo/todo.module';
import { CopyTodoController } from './copy-todo.controller';

@Module({
  controllers: [CopyTodoController],
  imports: [TodoModule]
})
export class CopyTodoModule { }
