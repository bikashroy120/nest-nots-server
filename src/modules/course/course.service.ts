/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CourseFilterDto } from './dto/course-filter.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { calculatePagination } from 'src/common/helper/paginationHelper';

@Injectable()
export class CourseService {
  constructor(private readonly prismaCLient: PrismaService) { }
  async create(createCourseDto: CreateCourseDto) {
    const result = await this.prismaCLient.course.create({
      data: {
        title: createCourseDto.title,
        description: createCourseDto.description,
        thumbnail: createCourseDto.thumbnail,
        price: createCourseDto.price,
        instructorId: createCourseDto.instructorId,
        categoryId: createCourseDto.categoryId,
      },
    });
    return result;
  }

  async findAll(filterOptions: CourseFilterDto, paginationOptions: PaginationDto) {
    const { searchTram, ...otherFilter } = filterOptions;

    const andConditions: any[] = [];

    if (searchTram) {
      andConditions.push({
        OR: ["title"].map((item) => ({
          [item]: { contains: searchTram, mode: "insensitive" }
        })),
      })
    }

    if (Object.keys(otherFilter).length) {
      andConditions.push({
        AND: Object.entries(otherFilter).map(([key, value]) => {
          return {
            [key]: { in: value }
          }
        })
      })
    }

    const { page, limit, skip, sortOrder, sortBy } = calculatePagination(paginationOptions);

    const whereCOnditions = andConditions.length > 0 ? { AND: andConditions } : {}

    const result = await this.prismaCLient.course.findMany({
      where: whereCOnditions,
      include: {
        category: true
      },
      skip,
      take: limit,
      orderBy: sortBy && sortBy ? { [sortBy]: sortOrder } : { createdAt: "desc" }
    })

    const total = await this.prismaCLient.course.count({
      where: whereCOnditions,
    })

    return {
      meta: {
        total,
        page,
        limit
      },
      data: result
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
