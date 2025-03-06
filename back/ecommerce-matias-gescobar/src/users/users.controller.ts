import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { validateUserInteceptor } from "../interceptors/validateUser.interceptor";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "../decorators/roles.decorators";
import { Role } from "../roles.enum";
import { updateUserDto } from "../dtos/updateUserDto"
import { ApiBearerAuth } from "@nestjs/swagger";


@Controller('users')
export class UsersController{
    constructor (private readonly usersService : UsersService) {}

    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(HttpStatus.OK)
    getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 5){
        return this.usersService.getUsers(page, limit);
    }

    @ApiBearerAuth()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    getUserById(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.getUserById(id);
    }

    @ApiBearerAuth()
    @Put(':id')
    @UseInterceptors(validateUserInteceptor)
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() updateUser: updateUserDto){
        return this.usersService.updateUser(id, updateUser);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    deleteUser(@Param('id', ParseUUIDPipe) id: string){
        return this.usersService.deleteUser(id);
    }
}
