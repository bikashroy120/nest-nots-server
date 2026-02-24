/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator";

export class CreateChapterDto {
    @IsString()
    title: string;

    @IsNumber()
    courseId: number;
}
