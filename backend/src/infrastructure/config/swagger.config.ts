import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Application API')
  .setDescription('API documentation for the Application')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();
