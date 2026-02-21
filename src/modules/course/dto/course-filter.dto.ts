/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";

export class CourseFilterDto {
    @IsString()
    @IsOptional()
    searchTram?: string;

    @IsOptional()

    @Transform(({ value }): string[] => (Array.isArray(value) ? value : [value]))
    @IsArray()
    @IsString({ each: true })
    categoryId?: string[];

    @IsString()
    @IsOptional()
    isPublished?: string
}