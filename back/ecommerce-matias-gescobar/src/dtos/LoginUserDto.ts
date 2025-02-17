import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";


export class loginUserDto {

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string

    @Length(8,15)
    @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
    password: string
}