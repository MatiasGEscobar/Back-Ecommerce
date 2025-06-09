import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from "bcryptjs"
import { createUserDto } from '../dtos/CreateUserDto';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../roles.enum';

@Injectable()
export class AuthService{
  constructor (private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService
  ){}

async signUp(user: createUserDto){
    const dbUser = await this.userRepository.findByEmail(user.email)

    if(dbUser){
        throw new BadRequestException ('Email already exists')
    }

    if(user.password !== user.confirmPassword){
        throw new BadRequestException ("passwords don't match")
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)

    if(!hashedPassword){
        throw new BadRequestException("Password couldn't be hashed")
    }

    this.userRepository.createUser({...user, password: hashedPassword})
    return {success:  'User created succesfully'}
}
    
async signIn (email: string, password: string ): Promise<{ success: string; token: string }>{
    const user = await this.userRepository.findByEmail(email);
    console.log('User from database:', user); // Agrega este log

    if (!user) {
      throw new BadRequestException('Login Incorrecto');
    }
    console.log('User password from database:', user.password); // Agrega este log
    console.log('Type of user.password:', typeof user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Login Incorrecto');
    }

    const userPayload = {
      id: user.id,
      email: user.email,
      roles: [
        user.isAdmin ? false : true
        // user.isTrainer ? Role.Trainer : 
        // Role.Client
      ]
    };

    const token = this.jwtService.sign(userPayload);
    return { success: 'Login Exitoso!', token };
  }
}