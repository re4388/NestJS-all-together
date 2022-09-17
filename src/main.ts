import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); // 取得 ConfigService
  const port = configService.get('port');
  console.log("port", port);
  await app.listen(port);
}
bootstrap();
