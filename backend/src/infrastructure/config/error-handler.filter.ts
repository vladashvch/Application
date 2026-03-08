import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ErrorHandlerFilter implements ExceptionFilter {
  private readonly logger = new Logger('ErrorHandler');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const resBody =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: exception.message || 'Internal server error' };

    const stack =
      status === 500 ? (exception instanceof Error ? exception.stack : '') : '';

    this.logger.error(
      `Method: ${request.method} | URL: ${request.url} | Status: ${status} | Message: ${JSON.stringify(resBody)}`,
      stack,
    );

    response.status(status).json({
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...(typeof resBody === 'object' ? resBody : { message: resBody }),
    });
  }
}
