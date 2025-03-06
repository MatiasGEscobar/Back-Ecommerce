import { Injectable } from '@nestjs/common'
import { UsersRepository } from './users.repository'
import { createUserDto } from '../dtos/CreateUserDto';
import { updateUserDto } from 'src/dtos/updateUserDto';

@Injectable()
export class UsersService{
    constructor (private readonly usersRepository : UsersRepository){}
    
    getUsers(page: number, limit: number) { 
        return this.usersRepository.getUsers(page,limit);
    }

    getUserById(id: string) {               
        return this.usersRepository.getById(id);
    } 

    updateUser(id: string, user: updateUserDto) {                                  
        return this.usersRepository.updateUser(id, user);
    }

    deleteUser(id: string) {                                                 
        return this.usersRepository.deleteUser(id);
    }
}
