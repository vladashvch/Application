import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { getValidationPipeConfig } from './infrastructure/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(getValidationPipeConfig()));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
