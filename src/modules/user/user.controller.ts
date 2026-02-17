/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userServices: UserService) { }

    @Get("")
    async getAllUser() {
        const result = await this.userServices.getAllUser();
        return result;
    }

    @Patch(":id")
    async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
        const numberId = Number(id)
        const result = await this.userServices.updateUser(numberId, data)
        return result;
    }

}
