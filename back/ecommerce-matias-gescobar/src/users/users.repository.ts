import { BadRequestException, NotFoundException } from "@nestjs/common";
import { User } from "../entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createUserDto } from "../dtos/CreateUserDto";
import { updateUserDto } from "src/dtos/updateUserDto";


export class UsersRepository{
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ){}

async getUsers(page : number = 1, limit: number = 5) : Promise <Partial<User>[]> {
    let users = await this.usersRepository.find()

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + +limit
    users = users.slice(startIndex, endIndex);

    const userWithoutPassword = users.map(({password, ...user}) => user)

    return userWithoutPassword
}

async getById(id : string) {
    const user = await this.usersRepository.findOne({
        where:{ id },
        relations: {
            orders: true,
        },
    });

    if(!user){
        throw new NotFoundException('Usuario no encontrado')
    }

    const { password, isAdmin, ...userWithoutPassword} = user
    return userWithoutPassword;
}

async createUser(user: createUserDto): Promise <Partial<User>>{
    const newUser = await this.usersRepository.save(user)

    const {password, isAdmin, ...userWithoutPassword } = newUser

    return userWithoutPassword
}

async updateUser(id : string, user: updateUserDto) {
    const serchUser = await this.usersRepository.findOneBy({ id })

    if(!serchUser){
        throw new BadRequestException ("El usuario no exite, debe registrarse")
    }

    await this.usersRepository.update(id, user)

    const updateUser = await this.usersRepository.findOneBy({ id })

    const {password, isAdmin, ...userWithoutPassword } = updateUser

    return userWithoutPassword
}

async deleteUser(id : string): Promise<Partial<User>>{
    const user = await this.usersRepository.findOneBy({ id })

    if(!user){
        throw new NotFoundException('Usuario no encontrado')
    }

    this.usersRepository.remove(user)

    const {password, isAdmin, ...userWithoutPassword } = user

    return userWithoutPassword
    
}

async findByEmail(email: string): Promise<User>{
    return await this.usersRepository.findOneBy({email});
}
}