import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envSchema } from './config/env.validation';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');
  const env = envSchema.parse(process.env);
  
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  await app.listen(env.PORT);
  logger.log(`Gateway is running on port ${env.PORT}`);
}
bootstrap();
