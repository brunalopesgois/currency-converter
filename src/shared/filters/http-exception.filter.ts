import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const details = exception.getResponse();
    const stack = exception.stack;

    const responseObject = {
      statusCode: status,
      details,
      stack,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (status > 399 && status < 500) {
      this.logger.warn(responseObject);
    } else {
      this.logger.error(responseObject);
    }

    response.status(status).json(responseObject);
  }
}
