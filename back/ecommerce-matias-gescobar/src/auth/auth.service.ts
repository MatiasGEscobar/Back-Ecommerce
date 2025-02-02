import { Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService{
  constructor (private readonly userRepository: UsersRepository){}
    
singIn (email: string, password: string ): string{
    const user = this.userRepository.findByEmail(email);
     if (!user || user?.password !== password){
        return "Login Incorrecto"
    }
        return "Login Exitoso!"
    }
}