/* eslint-disable prettier/prettier */
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLessonDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    videoUrl?: string;

    @IsOptional()
    @IsString()
    content: string

    @IsNumber()
    chapterId: number;
}
