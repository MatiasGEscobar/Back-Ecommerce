import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { validateUserInteceptor } from "../interceptors/validateUser.interceptor";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "../decorators/roles.decorators";
import { Role } from "../roles.enum";
import { createUserDto } from "../dtos/CreateUserDto";


@Controller('users')
export class UsersController{
    constructor (private readonly usersService : UsersService) {}

    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(HttpStatus.OK)
    getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 5){
        return this.usersService.getUsers(page, limit);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    getUserById(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.getUserById(id);
    }


    @Put(':id')
    @UseInterceptors(validateUserInteceptor)
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() updateUser: Partial<createUserDto>){
        return this.usersService.updateUser(id, updateUser);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    deleteUser(@Param('id', ParseUUIDPipe) id: string){
        return this.usersService.deleteUser(id);
    }
}
