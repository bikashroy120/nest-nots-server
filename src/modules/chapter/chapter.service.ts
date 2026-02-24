/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChapterService {
  constructor(private readonly prismaClient: PrismaService) { }
  async create(createChapterDto: CreateChapterDto) {
    const result = await this.prismaClient.chapter.create({
      data: createChapterDto,
    });

    if (!result) {
      throw new BadRequestException("failed to create chapter")
    }
    return result;
  }

  async findAll(id: number) {
    const result = await this.prismaClient.chapter.findMany({
      where: { courseId: id }
    });

    if (!result) {
      return []
    }
    return result;
  }

  async findOne(id: number) {
    const result = await this.prismaClient.chapter.findUnique({
      where: {
        id
      }
    })

    if (!result) {
      throw new BadRequestException("chapter not fount this id");
    }
    return result;
  }

  async update(id: number, updateChapterDto: UpdateChapterDto) {
    const result = await this.prismaClient.chapter.update({
      where: { id },
      data: updateChapterDto
    })

    if (!result) {
      throw new BadRequestException("failed to update chapter");
    }

    return result;
  }

  async remove(id: number) {
    const result = await this.prismaClient.chapter.delete({
      where: { id }
    })

    if (!result) {
      throw new BadRequestException("failed to delete chapter");
    }
    return result;
  }
}
