/* eslint-disable prettier/prettier */
import { IsEmail, IsString, MinLength } from "class-validator";


export class LoginDto {
    @IsEmail()
    email: string

    @IsString()
    @MinLength(4, { message: "password need minium 4 digit" })
    password: string
}