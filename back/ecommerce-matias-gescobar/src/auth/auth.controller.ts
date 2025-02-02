import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController{
    constructor (private readonly authService: AuthService) {}

@Post('singin')
singIn(@Body('email') email:string,@Body('password') password: string){
    if(!email || !password){
        return "Email y Password son Necesarios"
    }

return this.authService.singIn(email, password)

}

}
