/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from "class-validator";

export class EnrollmentFilterDto {
    @IsString()
    @IsOptional()
    searchTram?: string;

    @IsString()
    @IsOptional()
    startDate?: string;

    @IsString()
    @IsOptional()
    endDate?: string;
}