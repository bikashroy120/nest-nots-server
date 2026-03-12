/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { PrismaClientExceptionFilter } from './common/prisma-client-exception/prisma-client-exception.filter';
import { AllExceptionFilter } from './common/all-exception/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  // app.useGlobalInterceptors(new LoggerInterceptor())
  app.useGlobalFilters(new PrismaClientExceptionFilter(), new AllExceptionFilter());
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
