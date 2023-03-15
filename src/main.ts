import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Esto se  agrega al endpoint
  app.setGlobalPrefix("api/v2")
  await app.listen(3000);
}
bootstrap();
