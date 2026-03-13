/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EnrollmentFilterDto } from './dto/enrolement-filter.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { calculatePagination } from 'src/common/helper/paginationHelper';

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

  async findAll(filter: EnrollmentFilterDto, paginationFilters: PaginationDto) {
    const { searchTram, startDate, endDate } = filter;
    const andCondition: any[] = [];

    if (searchTram) {
      andCondition.push({
        OR: [
          {
            course: {
              title: {
                contains: searchTram,
                mode: "insensitive"
              }
            }
          },
          {
            user: {
              name: {
                contains: searchTram,
                mode: "insensitive"
              }
            }
          }
        ]
      })
    }

    if (startDate && endDate) {
      andCondition.push({
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      })
    }

    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};

    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationFilters);

    const result = await this.prismaClient.enrollment.findMany({
      where: whereCondition,
      include: {
        course: true,
        user: true,
      },
      skip,
      take: limit,
      orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" }
    })

    const total = await this.prismaClient.enrollment.count({ where: whereCondition })

    return {
      meta: {
        total,
        page,
        limit
      },
      data: result
    }
  }

  async findOne(id: number) {
    const result = await this.prismaClient.enrollment.findUnique({
      where: { id },
      include: {
        course: true,
        user: true
      }
    })
    return result;
  }

  async remove(id: number) {
    const result = await this.prismaClient.enrollment.delete({
      where: { id }
    });
    return result;
  }
}
