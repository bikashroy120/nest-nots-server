/* eslint-disable prettier/prettier */
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCourseDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    thumbnail: string;

    @IsNumber()
    price: number;

    @IsBoolean()
    @IsOptional()
    isPublished: boolean;

    @IsNumber()
    categoryId: number;

    @IsNumber()
    instructorId: number;
}
