/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from '../auth/dto/register.dto';

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
}
