import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt'
import { createUserDto } from 'src/dtos/CreateUserDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService{
  constructor (private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService
  ){}

async singUp(user: createUserDto){
    const dbUser = await this.userRepository.findByEmail(user.email)

    if(!user){
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
    
async singIn (email: string, password: string ): Promise<{}>{
    const user = await this.userRepository.findByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user?.password)

    if (!user || !isPasswordValid) {
        throw new BadRequestException("Login Incorrecto");
    }

    const userPayload = {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin
    }
    const token = this.jwtService.sign(userPayload)
        return { success: "Login Exitoso!", token }
    }
}