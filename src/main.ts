import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); // 取得 ConfigService
  const port = configService.get('port');
  console.log("port", port);
  setupSwagger(app);
  await app.listen(port);
}


function setupSwagger(app: INestApplication) {
  const builder = new DocumentBuilder();
  const config = builder
    .setTitle('TodoList')
    .setDescription('This is a basic Swagger document.')
    .setVersion('1.0')
    // .addBearerAuth()
    // .addBasicAuth()
    .addOAuth2({
      type: 'oauth2',
      flows: {
        implicit: {
          authorizationUrl: '<AUTHORIZATION_URL>', // 授權位址
          tokenUrl: '<TOKEN_URL>', // 授權用 token
          scopes: { // 權限選項
            read: 'read',
            write: 'write',
            update: 'update',
            delete: 'delete',
          },
        },
      },
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const options: SwaggerCustomOptions = {
    explorer: true, // enable search
  };
  SwaggerModule.setup('api', app, document, options);
}



bootstrap();
