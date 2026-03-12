/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentService {
  constructor(private prismaClient: PrismaService) { }
  async create(createEnrollmentDto: CreateEnrollmentDto) {
    try {
      const result = await this.prismaClient.enrollment.create({
        data: createEnrollmentDto
      });

      return result;
    } catch (error: unknown) { // error এখন unknown
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException("এই ইউজার অলরেডি এই কোর্সে ইনরোল করেছেন!");
        }
      }
      throw new Error(error instanceof Error ? error.message : "Internal Server Error");
    }
  }

  async findAll() {
    const result = await this.prismaClient.enrollment.findMany()
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} enrollment`;
  }

  remove(id: number) {
    return `This action removes a #${id} enrollment`;
  }
}
