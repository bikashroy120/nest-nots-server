/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from "class-validator";

export class CourseFilterDto {
    @IsString()
    @IsOptional()
    searchTram?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsString()
    @IsOptional()
    isPublished?: string
}