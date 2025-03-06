import { PickType } from "@nestjs/swagger";
import { createUserDto } from "./CreateUserDto";


export class loginUserDto extends PickType(createUserDto,
    [
        'email',
        'password'
    ]
){}