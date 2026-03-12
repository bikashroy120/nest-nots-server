/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    console.log(result);


    return result;
  }

  async findAll(filterOptions: CourseFilterDto, paginationOptions: PaginationDto) {
    const { searchTram, category, ...otherFilter } = filterOptions;

    const andConditions: any[] = [];

    if (searchTram) {
      andConditions.push({
        OR: ["title"].map((item) => ({
          [item]: { contains: searchTram, mode: "insensitive" }
        })),
      })
    }
    if (category) {
      andConditions.push({
        AND: {
          categoryId: Array.isArray(category) ? { in: Number(category) } : Number(category)
        }
      })
    }

    if (Object.keys(otherFilter).length) {
      andConditions.push({
        AND: Object.entries(otherFilter).map(([key, value]) => {

          if (Array.isArray(value)) {
            return {
              [key]: { in: value }
            }
          }
          return { [key]: value }
        })
      })
    }

    const { page, limit, skip, sortOrder, sortBy } = calculatePagination(paginationOptions);

    const whereCOnditions = andConditions.length > 0 ? { AND: andConditions } : {}
    const result = await this.prismaCLient.course.findMany({
      where: whereCOnditions,
      include: {
        category: true,
        instructor: {
          select: { name: true, avatar: true, email: true }
        },
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

  async findOne(id: number) {
    const result = await this.prismaCLient.course.findUnique({
      where: { id }, include: {
        category: true,
        instructor: {
          select: { name: true, email: true, avatar: true }
        },
        chapters: {
          select: {
            lessons: true,
            title:true,
          }
        }
      }
    });

    if (!result) {
      throw new NotFoundException("course not found this id")
    }

    return result;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const result = await this.prismaCLient.course.update({
      where: { id },
      data: { ...updateCourseDto }
    })
    if (!result) {
      throw new BadRequestException("failed to update course")
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.prismaCLient.course.delete({
      where: { id }
    });

    if (!result) {
      throw new NotFoundException("course not found this id")
    }
    return result;
  }
}
