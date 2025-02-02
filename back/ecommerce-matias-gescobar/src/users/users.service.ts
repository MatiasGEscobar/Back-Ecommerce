import { Injectable } from '@nestjs/common'
import { UsersRepository } from './users.repository'
import { User } from './users.entity';

@Injectable()
export class UsersService{
    constructor (private usersRepository : UsersRepository){}
    
    async getUsers(page: number, limit: number): Promise <Omit<User, 'password'>[]> { 
        const users = await this.usersRepository.getUsers(page,limit);
        return users.map((user) => ({ ...user, password: undefined }));
    }

    getUserById(id: Number): Omit <User, 'password'> | undefined{               
        const userFound = this.usersRepository.getById(id);
        if (!userFound){
            return undefined;
        }
        const {password, ...rest} = userFound
        return rest;
    } 

    createUser(createUser : User) : Promise <Number>{ 
        return this.usersRepository.createUser(createUser) 
    }

    updateUser(id: Number, updateUser: User): Promise <Number>{                                  
        return this.usersRepository.updateUser(id, updateUser);
    }

    deleteUser(id: Number): Promise <Number>{                                                 
        return this.usersRepository.deleteUser(id);
    }
}
