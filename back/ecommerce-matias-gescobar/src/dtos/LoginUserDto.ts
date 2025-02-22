import { PickType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { createUserDto } from "./CreateUserDto";


export class loginUserDto extends PickType(createUserDto,
    [
        'email',
        'password'
    ]
){}