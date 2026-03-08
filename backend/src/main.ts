import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common/services/logger.service';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import {
  ErrorHandlerFilter,
  getCoreConfig,
  swaggerConfig,
} from './infrastructure/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  app.enableCors(getCoreConfig(config));
  app.useGlobalFilters(new ErrorHandlerFilter());

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, swaggerDocument, {
    yamlDocumentUrl: '/openapi.yaml',
  });

  const port = config.getOrThrow<number>('HTTP_PORT');
  const host = config.getOrThrow<string>('HTTP_HOST');

  await app.listen(port);

  logger.log(`Gateway started: ${host}`);
  logger.log(`Swagger: ${host}/docs`);
}
void bootstrap();
