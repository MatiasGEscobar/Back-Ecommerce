import { PickType } from "@nestjs/swagger";
import { createUserDto } from "./CreateUserDto";


export class updateUserDto extends PickType(createUserDto,
    [   
        'name',
        'email',
        'password',
        'confirmPassword',
        'address',
        'phone',
        'country',
        'city'
    ]
){}