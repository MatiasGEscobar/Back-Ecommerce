import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { loginUserDto } from "../dtos/LoginUserDto";
import { validateUserInteceptor } from "../interceptors/validateUser.interceptor";
import { createUserDto } from "../dtos/CreateUserDto";


@Controller('auth')
export class AuthController{
    constructor (private readonly authService: AuthService) {}

@Post('signup')
@UseInterceptors(validateUserInteceptor)
@HttpCode(HttpStatus.CREATED)
createUser(
    @Body() user: createUserDto
){
    return this.authService.signUp(user)
}


@Post('signin')
singIn(@Body() loginUser: loginUserDto){
    
    return this.authService.signIn(loginUser.email, loginUser.password)
}

}
