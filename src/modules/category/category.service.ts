/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaClient: PrismaService) { }
  async create(createCategoryDto: CreateCategoryDto) {
    const result = await this.prismaClient.category.create({
      data: { name: createCategoryDto.name }
    });

    if (!result) {
      throw new BadRequestException("failed to create category")
    }

    return result;
  }

  async findAll() {
    const result = await this.prismaClient.category.findMany();
    return result;
  }

  async findOne(id: number) {
    const result = await this.prismaClient.category.findUnique({
      where: { id }
    })
    if (!result) {
      throw new NotFoundException("category not found")
    }
    return result
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const result = await this.prismaClient.category.update({
      where: { id },
      data: { ...updateCategoryDto }
    });
    if (!result) {
      throw new NotFoundException("category not found")
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.prismaClient.category.delete({
      where: {
        id
      }
    });

    if (!result) {
      throw new NotFoundException("category not found")
    }

    return result;
  }
}
