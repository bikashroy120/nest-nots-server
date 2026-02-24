/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonDto } from './create-lesson.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
    @IsOptional()
    @IsNumber()
    order?: number;
}
