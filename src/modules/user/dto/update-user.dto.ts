/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/mapped-types";
import { IsOptional, IsString } from "class-validator";

export class UserDto {
    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    role?: string

    @IsString()
    @IsOptional()
    avatar?: string

    @IsString()
    @IsOptional()
    address?: string
}

export class UpdateUserDto extends PartialType(UserDto) { }
