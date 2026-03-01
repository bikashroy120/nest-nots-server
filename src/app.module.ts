/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { CourseModule } from './modules/course/course.module';
import { ChapterModule } from './modules/chapter/chapter.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { EnrollmentModule } from './modules/enrollment/enrollment.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, CategoryModule, PrismaModule, CourseModule, ChapterModule, LessonModule, EnrollmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
