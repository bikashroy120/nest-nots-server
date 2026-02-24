/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LessonService {
  constructor(private readonly prismaClient: PrismaService) { }
  async create(createLessonDto: CreateLessonDto) {
    const result = await this.prismaClient.lesson.create({
      data: createLessonDto,
    });

    if (!result) {
      throw new BadRequestException("failed to create lesson");
    }
    return result;
  }

  async findAll(id: number) {
    const result = await this.prismaClient.lesson.findMany({
      where: { chapterId: id },
    });

    if (!result) {
      return [];
    }
    return result;
  }

  async findOne(id: number) {
    const result = await this.prismaClient.lesson.findUnique({
      where: { id }
    })

    if (!result) {
      throw new BadRequestException("lesson not found")
    }
    return result;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    const result = await this.prismaClient.lesson.update({
      where: { id },
      data: updateLessonDto
    });

    if (!result) {
      throw new BadRequestException("failed to update lesson")
    }

    return result;
  }

  async remove(id: number) {
    const result = await this.prismaClient.lesson.delete({
      where: { id }
    });
    if (!result) {
      throw new BadRequestException("failed to delete lesson")
    }
    return result;
  }
}
