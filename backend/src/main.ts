import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import {
  getCoreConfig,
  getValidationPipeConfig,
} from './infrastructure/config';
import { Logger } from '@nestjs/common/services/logger.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(getValidationPipeConfig()));

  const config = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  app.enableCors(getCoreConfig(config));

  const port = config.getOrThrow<number>('HTTP_PORT');
  const host = config.getOrThrow<string>('HTTP_HOST');

  await app.listen(port);

  logger.log(`Gateway started: ${host}`);
}
bootstrap();
