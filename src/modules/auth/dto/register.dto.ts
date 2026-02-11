/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string

    @IsString()
    @MinLength(4, { message: "password must be 4 digit" })
    password: string;
}
