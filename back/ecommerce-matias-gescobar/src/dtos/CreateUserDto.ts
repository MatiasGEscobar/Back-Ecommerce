import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Length, Matches } from "class-validator";


export class createUserDto {
    @ApiProperty({
        description: 'Nombre de Usuario con un minimo de 3 caracteres y maximo de 80 caracteres',
        example: 'Example'
    })
    @IsNotEmpty()
    @IsString()
    @Length(3,80)
    name: string

    @ApiProperty({
        description: 'Email del Usuario',
        example: 'Example@gmail.com'
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty({
        description: 'Contraseña la cual debe incluir al menos 1 letra mayuscula, 1 letra minuscula, 1 número y un caracter especial (!@#$%^&*) con un minimo de 8 caracteres y maximo de 15',
        example: 'Lavida#EsBell@2'
    })
    @IsNotEmpty()
    @IsString()
    @Length(8,15)
    @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
    password: string

    @ApiProperty({
        description: 'Contraseña la cual debe incluir al menos 1 letra mayuscula, 1 letra minuscula, 1 número y un caracter especial (!@#$%^&*) con un minimo de 8 caracteres y maximo de 15',
        example: 'Lavida#EsBell@2'
    })
    @IsNotEmpty()
    @IsString()
    @Length(8,15)
    @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
    confirmPassword: string

    @ApiProperty({
        description: 'Domicilio del usuario, minimo de 3 caracteres y maximo de 80 caracteres',
        example: 'Calle Sin Salida 225'
    })
    @IsNotEmpty()
    @IsString()
    @Length(3,80)
    address: string

    @ApiProperty({
        description: 'Telefono del usuario',
        example: '3624669758'
    })
    @IsNotEmpty()
    @IsNumber()
    phone: number

    @ApiProperty({
        description: 'Pais del usuario, minimo de 5 caracteres y maximo de 20 caracteres',
        example: 'Argentina'
    })
    @IsString()
    @Length(5,20)
    country: string

    @ApiProperty({
        description: 'Cuidad del usuario, minimo de 5 caracteres y maximo de 20 caracteres',
        example: 'Formosa'
    })
    @IsString()
    @Length(5,20)
    city: string

    // @ApiProperty({
    //     description: 'Role del usuario es definido por defecto o por el Programador',
    //     default: false
    // })
    @IsEmpty()
    isAdmin?: boolean;

}