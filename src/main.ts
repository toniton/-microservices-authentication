import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.startAllMicroservicesAsync();
  await app.listen(8090);
}
bootstrap();
