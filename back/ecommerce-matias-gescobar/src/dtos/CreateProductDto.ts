import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";


export class createProductDto {
    @IsNotEmpty()
    @IsString()
    @Length(3,80)
    name: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    @IsNumber()
    stock: number

    @IsNotEmpty()
    @IsString()
    imgUrl: string

}