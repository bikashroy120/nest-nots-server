/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaCLient: PrismaService) { }

    async getUserByEmail(email: string) {
        const user = await this.prismaCLient.user.findFirst({ where: { email: email } });
        return user;
    }

    async createUser(){
        
    }
}
