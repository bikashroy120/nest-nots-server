/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { pick } from 'src/common/helper/pick';
import { paginationFields } from 'src/common/helper/constant';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  async findAll(@Query() query: Record<string, any>) {
    const filter = pick(query, ["searchTram", "category"])
    const paginationOptions = pick(query, paginationFields)
    return await this.courseService.findAll(filter, paginationOptions);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.courseService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return await this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.courseService.remove(+id);
  }
}
