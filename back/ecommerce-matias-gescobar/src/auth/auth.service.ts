import { Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService{
  constructor (private readonly userRepository: UsersRepository){}
    
async singIn (email: string, password: string ): Promise<string>{
    const user = await this.userRepository.findByEmail(email);
     if (!user || user?.password !== password){
        return "Login Incorrecto"
    }
        return "Login Exitoso!"
    }
}