/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prismaCLient: PrismaService) { }

    async getUserByEmail(email: string) {
        const user = await this.prismaCLient.user.findFirst({ where: { email: email } });
        return user;
    }

    async createUser(data: RegisterDto) {
        const user = await this.prismaCLient.user.create({
            data: { ...data }
        })
        return user;
    }

    async getUserById(id: number) {
        const user = await this.prismaCLient.user.findUnique({
            where: { id: id }
        })
        return user;
    }

    async getAllUser() {
        const result = await this.prismaCLient.user.findMany();
        return result;
    }

    async updateUser(id: number, data: UpdateUserDto) {
        const update = await this.prismaCLient.user.update({
            where: { id },
            data: { ...data, role: data.role as Role },
        })

        return update
    }
}
