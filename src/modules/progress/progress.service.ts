/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgressService {
  constructor(private readonly prismaClient: PrismaService) { }
  async create(createProgressDto: CreateProgressDto) {

    const { enrollmentId, lessonId } = createProgressDto;

    const enrollment = await this.prismaClient.enrollment.findUnique({
      where: {
        id: enrollmentId,
      }
    })

    if (!enrollment) {
      throw new BadRequestException("enrollment not found")
    }


    const progressResult = await this.prismaClient.progress.upsert({
      where: {
        enrollmentId_lessonId: { enrollmentId, lessonId }
      },
      update: { isCompleted: true },
      create: {
        enrollmentId,
        lessonId,
        isCompleted: true
      }
    });


    const chapters = await this.prismaClient.chapter.findMany({
      where: {
        courseId: enrollment.courseId
      },
      include: {
        lessons: true
      }
    })

    const totalLessons = chapters.reduce((total, chapter) => total + chapter.lessons.length, 0);
    const completedLessonsCount = await this.prismaClient.progress.count({
      where: {
        enrollmentId: enrollmentId,
        isCompleted: true
      }
    });
    const percentage = totalLessons > 0 ? (completedLessonsCount / totalLessons) * 100 : 0;

    await this.prismaClient.enrollment.update({
      where: { id: createProgressDto.enrollmentId },
      data: {
        progress: percentage
      }
    })

    return {
      message: "Progress updated successfully",
      progress: progressResult,
      currentPercentage: percentage
    };
  }
}
