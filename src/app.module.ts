import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './features/todo/todo.module';
import { CopyTodoModule } from './features/copy-todo/copy-todo.module';
import { HandsomeModule } from './handsome/handsome.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { HelloWorldMiddleware } from './middlewares/hello-world.middleware';
import { TodoController } from './features/todo/todo.controller';
import { AddUserMiddleware } from './middlewares/add-user.middleware';

class MessageBox {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}


@Module({
  imports: [TodoModule, CopyTodoModule,
    HandsomeModule
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: 'MESSAGE_BOX',
      useFactory: (appService: AppService) => {
        const message = appService.getHello();
        return new MessageBox(message);
      },
      inject: [AppService]
    },
    {
      provide: 'ALIAS_APP_SERVICE',
      useExisting: AppService
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware, HelloWorldMiddleware).forRoutes(TodoController)
    consumer.apply(AddUserMiddleware).forRoutes("")

    // configure(consumer: MiddlewareConsumer) {
    //   consumer.apply(LoggerMiddleware).forRoutes(TodoController)
    // }

    // consumer.apply(LoggerMiddleware).forRoutes('*');

    // consumer.apply(LoggerMiddleware).exclude(
    //   { path: '/todos', method: RequestMethod.GET } // 排除 GET /todos
    // ).forRoutes(TodoController)

    // consumer.apply(LoggerMiddleware).forRoutes(
    //   { path: '/todos', method: RequestMethod.POST }, // POST /todos 會生效
    //   { path: '/', method: RequestMethod.GET } // GET / 會生效
    // )
  }
}
