/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { pick } from 'src/common/helper/pick';
import { paginationFields } from 'src/common/helper/constant';


@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) { }

  @Post()
  async create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return await this.enrollmentService.create(createEnrollmentDto);
  }

  @Get()
  async findAll(@Query() query: Record<string, any>) {
    const filter = pick(query, ["searchTram", "startDate", "endDate"])
    const paginationFilter = pick(query, paginationFields)
    return await this.enrollmentService.findAll(filter, paginationFilter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.enrollmentService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.enrollmentService.remove(+id);
  }
}
