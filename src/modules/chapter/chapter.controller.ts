/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorater';
import { UserRole } from 'src/common/enum/role.enum';

@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) { }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR)
  async create(@Body() createChapterDto: CreateChapterDto) {
    return await this.chapterService.create(createChapterDto);
  }

  @Get("all/:id")
  async findAll(@Param("id") id: string) {
    return await this.chapterService.findAll(Number(id));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.chapterService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return await this.chapterService.update(+id, updateChapterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.chapterService.remove(+id);
  }
}
