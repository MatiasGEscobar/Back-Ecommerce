import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";


export class createProductDto {
    @ApiProperty({
        description: 'Nombre del producto con un minimo de 3 caracteres y maximo de 80 caracteres',
        example: 'Cuaderno'
    })
    @IsNotEmpty()
    @IsString()
    @Length(3,80)
    name: string

    @ApiProperty({
        description: 'Descripcion del producto',
        example: 'cuaderno tapa dura de 200 hojas blancas'
    })
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty({
        description: 'Precio del producto',
        example: '250'
    })
    @IsNotEmpty()
    @IsNumber()
    price: number

    @ApiProperty({
        description: 'Stock o cantidad de producto',
        example: '150'
    })
    @IsNotEmpty()
    @IsNumber()
    stock: number

    @ApiProperty({
        description: 'Imagen del producto',
        example: 'https://imgs.search.brave.com/m1WcTpv3bmvKtbvXrKHNE-RBAt5NTFS18fggJX00DFs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFzNVQzYWZFK0wu/anBn'
    })
    @IsNotEmpty()
    @IsString()
    imgUrl: string

}