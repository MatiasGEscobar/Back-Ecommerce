import { Injectable } from '@nestjs/common'
import { UsersRepository } from './users.repository'
import { User } from 'src/entities/users.entity';
import { createUserDto } from 'src/dtos/CreateUserDto';

@Injectable()
export class UsersService{
    constructor (private readonly usersRepository : UsersRepository){}
    
    getUsers(page: number, limit: number) { 
        return this.usersRepository.getUsers(page,limit);
    }

    getUserById(id: string) {               
        return this.usersRepository.getById(id);
    } 

    createUser(user : createUserDto) { 
        return this.usersRepository.createUser(user); 
    }

    updateUser(id: string, user: createUserDto) {                                  
        return this.usersRepository.updateUser(id, user);
    }

    deleteUser(id: string) {                                                 
        return this.usersRepository.deleteUser(id);
    }
}
