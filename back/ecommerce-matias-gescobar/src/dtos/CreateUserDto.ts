import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Matches } from "class-validator";


export class createUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(3,80)
    name: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @Length(8,15)
    @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
    password: string

    @IsNotEmpty()
    @IsString()
    @Length(3,80)
    address: string

    @IsNotEmpty()
    @IsNumber()
    phone: number

    @IsString()
    @Length(5,20)
    country: string

    @IsString()
    @Length(5,20)
    city: string

}