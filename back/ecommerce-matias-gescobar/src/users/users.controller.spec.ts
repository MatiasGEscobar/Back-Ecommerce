import { UsersController } from "./users.controller";
import { Test } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { User } from "../entities/users.entity";
import { AuthGuard } from "../guards/auth.guard";
import { JwtService } from "@nestjs/jwt";

describe('usersController', () => {
    let usersController: UsersController;
    let mockUserService: Partial<UsersService>            // servicio de prueba

    const mockUser: Partial<User[]> = [{                   //usuario de prueba
        id:'1',
        email: "prueba@mail.com",
        name: "Prueba",
        password: "Catalunia2502*",
        address: "calle 4528",
        phone: 584528,
        country: "Formosa",
        city: "Juarez",
        isAdmin: false,
        orders:[]
    }]
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [UsersController],
            providers:[{
                provide: UsersService,
                useValue: {
                    getUsers: jest.fn().mockResolvedValue(mockUser),
                    getUserById: jest.fn().mockResolvedValue(mockUser[0]),
                    updateUser: jest.fn().mockResolvedValue(mockUser[0]),
                    deleteUser: jest.fn().mockResolvedValue(mockUser),
            },
        },{
            provide: AuthGuard,
            useValue: {
                canActivate: jest.fn().mockReturnValue(true),
            },
        },{
            provide:JwtService,
            useValue:{
                sign: jest.fn().mockReturnValue('mock-token'),
                verify: jest.fn().mockReturnValue({ userId: 'mock-user-id'})
            },
        },
        ],
        }).compile();


        usersController = module.get<UsersController>(UsersController);
        mockUserService = module.get<UsersService>(UsersService);
    })

    it('Create a instance of UsersController', () => {
        expect(usersController).toBeDefined();
    })


})





