import { Injectable } from "@nestjs/common";
import { User } from "./users.entity";


@Injectable()
export class UsersRepository{
    private users: User[] = [];

async getUsers(){
    return this.users
}
}