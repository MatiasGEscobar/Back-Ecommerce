import { Injectable } from "@nestjs/common";
import { User } from "./users.entity";


@Injectable()
export class UsersRepository{
    private users: User[] = [];

async getUsers(page : number = 1, limit: number = 5) : Promise<User[]> {
    const startIndex = (page - 1) * limit;
    return this.users.slice(startIndex, startIndex + limit);
}

getById(id : Number) : User | undefined{
    const serchUser = this.users.find((user) => user.id === id);
    return serchUser;
}

async createUser(newUser: User): Promise <Number>{
    const id = this.users.length + 1;
    newUser.id = id;
    this.users.push(newUser);
    return id;
}

async updateUser(id : Number, updateUser : User) : Promise <Number>{
    const index = this.users.findIndex((user) => user.id == id);
    
    this.users[index].email = updateUser.email;
    this.users[index].name = updateUser.name;
    this.users[index].password = updateUser.password;
    this.users[index].address = updateUser.address;
    this.users[index].phone = updateUser.phone;
    this.users[index].country = updateUser.country;
    this.users[index].city = updateUser.city;

    return this.users[index].id;
}

async deleteUser(id : Number): Promise<Number>{
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index,1);
    return id;
}

findByEmail(email: string): User | undefined{
    const serchUser = this.users.find((user) => user.email === email);
    return serchUser;
}
}