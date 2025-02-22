import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { loginUserDto } from "src/dtos/LoginUserDto";
import { validateUserInteceptor } from "src/interceptors/validateUser.interceptor";
import { createUserDto } from "src/dtos/CreateUserDto";


@Controller('auth')
export class AuthController{
    constructor (private readonly authService: AuthService) {}

@Post('singup')
@UseInterceptors(validateUserInteceptor)
@HttpCode(HttpStatus.CREATED)
createUser(
    @Body() user: createUserDto
){
    return this.authService.singUp(user)
}


@Post('singin')
singIn(@Body() loginUser: loginUserDto){
    
    return this.authService.singIn(loginUser.email, loginUser.password)
}

}
