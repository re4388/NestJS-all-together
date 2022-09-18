import { Module } from '@nestjs/common';
import { SwaggerTodoController } from './swagger-todo.controller';
import { SwaggerTodoService } from './swagger-todo.service';

@Module({
  controllers: [SwaggerTodoController],
  providers: [SwaggerTodoService]
})
export class SwaggerTodoModule {}
