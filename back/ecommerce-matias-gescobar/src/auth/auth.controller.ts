import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { loginUserDto } from "src/dtos/LoginUserDto";


@Controller('auth')
export class AuthController{
    constructor (private readonly authService: AuthService) {}

@Post('singin')
singIn(@Body() loginUser: loginUserDto){

    const { email, password } = loginUser
    return this.authService.singIn(email, password)
}

}
