/* eslint-disable prettier/prettier */
import { IsNumber } from "class-validator";

export class CreateProgressDto {
    @IsNumber()
    enrollmentId: number;

    @IsNumber()
    lessonId: number
}
