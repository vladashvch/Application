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

  const port = config.getOrThrow<number>('HTTP_PORT');

  if (process.env.NODE_ENV !== 'production') {
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/docs', app, swaggerDocument, {
      yamlDocumentUrl: '/openapi.yaml',
    });

    logger.log(`Swagger: http://localhost:${port}/docs`);
  }

  logger.log(`Server started on port ${port}`);
  await app.listen(port);
}
void bootstrap();
