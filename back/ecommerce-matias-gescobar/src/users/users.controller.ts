import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "src/entities/users.entity";
import { validateUserInteceptor } from "src/interceptors/validateUser.interceptor";
import { AuthGuard } from "src/auth/auth.guard";
import { createUserDto } from "src/dtos/CreateUserDto";


@Controller('users')
export class UsersController{
    constructor (private readonly usersService : UsersService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
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
    updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() updateUser: createUserDto){
        return this.usersService.updateUser(id, updateUser);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    deleteUser(@Param('id', ParseUUIDPipe) id: string){
        return this.usersService.deleteUser(id);
    }
}
