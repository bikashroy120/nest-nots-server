/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards, } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) { }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createProgressDto: CreateProgressDto) {
    return this.progressService.create(createProgressDto);
  }
}
