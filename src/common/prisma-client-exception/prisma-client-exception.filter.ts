/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const message = exception.message.replace(/\n/g, '');

    console.log('Prisma Client Exception:', {
      code: exception.code,
      message: exception.message,
      meta: exception.meta,
    });

    switch (exception.code) {
      case 'P2002':
        response.status(400).json({
          statusCode: 400,
          message: 'Unique constraint failed',
          details: message,
          timestamp: new Date().toISOString(),
        });
        break;
      case 'P2025':
        response.status(404).json({
          statusCode: 404,
          message: 'Record not found',
          details: message,
          timestamp: new Date().toISOString(),
        });
        break;
      case 'P2003':
        response.status(404).json({
          statusCode: 404,
          message: 'Foreign key constraint failed',
          details: message,
          timestamp: new Date().toISOString(),
        });
        break;
      default:
        response.status(500).json({
          statusCode: 500,
          message: 'Internal Server Error',
          details: message,
          timestamp: new Date().toISOString(),
        });
        break;
    }
  }
}
