import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
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
    getUserById(@Param('id') id: string) {
        return this.usersService.getUserById(id);
    }

    @Post()
    @UseInterceptors(validateUserInteceptor)
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() createUser : createUserDto){
        return this.usersService.createUser(createUser);
    }

    @Put(':id')
    @UseInterceptors(validateUserInteceptor)
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    updateUser(@Param('id') id: string, @Body() updateUser: createUserDto){
        return this.usersService.updateUser(id, updateUser);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    deleteUser(@Param('id') id: string){
        return this.usersService.deleteUser(id);
    }
}
