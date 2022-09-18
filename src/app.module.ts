import {
  BeforeApplicationShutdown, MiddlewareConsumer,
  Module, NestModule, OnApplicationBootstrap,
  OnModuleDestroy, OnModuleInit,
  RequestMethod,
  ValidationPipe
} from '@nestjs/common';

import { HttpModule } from '@nestjs/axios'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './features/todo/todo.module';
import { CopyTodoModule } from './features/copy-todo/copy-todo.module';
import { HandsomeModule } from './handsome/handsome.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { HelloWorldMiddleware } from './middlewares/hello-world.middleware';
import { TodoController } from './features/todo/todo.controller';
import { AddUserMiddleware } from './middlewares/add-user.middleware';
import { ConfigurationModule } from './common/configuration/configuration.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StorageModule } from './common/storage/storage.module';
import { BookModule } from './common/book/book.module';
import { Storage2Module } from './common/storage2/storage2.module';
import configurationFactory from './config/configuration.factory';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MulterHelper } from './core/helper/multer.helper';
import { Agent } from 'https';
import { MongooseModule } from '@nestjs/mongoose';
import { MooUserModule } from './features/mooUser/mooUser.module';
import { AuthUserModule } from './features/authUser/authUser.module';
import MongoConfigFactory from './config/mongo.config';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './features/auth/auth.module';
import { UserController } from './features/user/user.controller';
import { AuthorizationModule } from './common/authorization/authorization.module';
import { TodosModule } from './features/todos/todos.module';
import SecretConfigFactory from './config/secret.config';
import { join } from 'path';

class MessageBox {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}



@Module({
  imports: [

    ConfigModule.forRoot({
      load: [MongoConfigFactory, SecretConfigFactory],
      isGlobal: true
    }),

    ConfigModule.forRoot({
      load: [MongoConfigFactory]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('mongo.uri')
      })
    }),


    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        httpsAgent: new Agent({ rejectUnauthorized: false }),
        timeout: config.get('HTTP_TIMEOUT')
      }),
      inject: [
        ConfigService
      ]
    }),


    // HttpModule.register({
    //   httpsAgent: new Agent({ rejectUnauthorized: false })
    // }),

    TodoModule,
    CopyTodoModule,
    HandsomeModule,

    ConfigModule.forRoot({
      envFilePath: ['development.local.env', 'development.env'],
      expandVariables: true // 開啟環境變數檔變數嵌入功能
    }),

    // MulterModule.register({
    //   storage: diskStorage({
    //     destination: MulterHelper.destination,
    //     filename: MulterHelper.filenameHandler
    //   })
    // }),

    MulterModule.register({
      dest: './upload'
    }),

    StorageModule,

    BookModule,

    Storage2Module,

    MooUserModule,

    AuthUserModule,

    AuthModule,

    // AuthorizationModule,

    AuthorizationModule.register({
      modelPath: join(__dirname, '../casbin/model.conf'),
      policyAdapter: join(__dirname, '../casbin/policy.csv'),
      global: true,
    }),

    TodosModule

    // ConfigModule.forRoot({
    //   envFilePath: ['development.local.env', 'development.env'],
    //   load: [configurationFactory]
    // })

    // ConfigModule.forRoot({
    //   envFilePath: 'development.env'
    // })
    // ConfigModule.forRoot()


    // ConfigurationModule.forRoot({
    //   path: `../${process.env.NODE_ENV || 'development'}.env`
    // })
  ],
  controllers: [
    AppController,
    UserController
  ],
  providers: [
    AppService,
    { // 注入全域 Pipe
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },

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
export class AppModule implements NestModule, OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown {
  beforeApplicationShutdown(): void {
    console.log('[AppModule]: before shutdown event!');
  }
  onModuleDestroy(): void {
    console.log('[AppModule]: destroy event!');
  }
  onApplicationBootstrap() {
    console.log('[AppModule]: bootstrap event!');
  }
  onModuleInit(): void {
    console.log('[AppModule]: initial event!');
  }

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
