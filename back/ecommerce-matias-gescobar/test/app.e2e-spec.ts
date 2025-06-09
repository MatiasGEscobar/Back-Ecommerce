import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { UsersRepository } from '../src/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from '../src/guards/auth.guard';
import { Role } from '../src/roles.enum';
import { RolesGuard } from '../src/guards/roles.guard';
import { ProductsRepository } from '../src/products/products.repository';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let mockUsersRepository: Partial<UsersRepository>;
  let mockProductsRepository: Partial<ProductsRepository>;
  let jwtService: JwtService;

  const testUser = {
        email: "prueba@mail.com",
        name: "Prueba",
        password: "Catalunia2502*",
        address: "calle 4528",
        phone: 584528,
        country: "Formosa",
        city: "Juarez",
        isAdmin: true,
        roles: [Role.Admin],
  }

  const testProducts = [{
    name: 'Producto 1',
    description: 'pruebaProducto 1',
    price: 599,
    stock: true,
    imgUrl: 'wwww.imagen.com',
  },]


  beforeEach(async () => {
    mockUsersRepository = {
      findByEmail: jest.fn().mockResolvedValue(testUser),
      getUsers: jest.fn().mockResolvedValue(testUser),
      createUser: jest.fn().mockResolvedValue(testUser)
    }

    mockProductsRepository = {
      createProduct: jest.fn().mockResolvedValue(testProducts),
      getProducts: jest.fn().mockResolvedValue(testProducts)
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [{
                      provide: AuthGuard,
                      useValue: {
                        canActivate: jest.fn().mockReturnValue(true),
                        },
                  },{
                      provide: RolesGuard,
                      useValue: {
                        canActivate: jest.fn().mockReturnValue(true),
                        },
                  },
                  {
                      provide:JwtService,
                      useValue:{
                        sign: jest.fn().mockReturnValue('mock-token'),
                        verify: jest.fn().mockReturnValue({ userId: 'mock-user-id',
                          ...testUser,
                          roles: ['admin'],
                          iat: new Date().getTime() / 1000,
                          exp: new Date().getTime() / 1000 + 3600,})
                      },
                  },],
    }).overrideProvider(UsersRepository).useValue(mockUsersRepository)
    .overrideProvider(ProductsRepository).useValue(mockProductsRepository)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService)
    jest.spyOn(bcrypt, 'compare').mockImplementation((password, hash) => {   //hashea la password
      return Promise.resolve(password === "Catalunia2502*")
    })
  });

  
  it('Get /users/ retorne ok teniendo el token', async () => {
    const token = jwtService.sign(testUser);
    const req = await request(app.getHttpServer()).get('/users').set('Authorization', `Bearer ${token}`);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object)
  });


  it('Post en la ruta /auth/singIn deberia autenticar al usuario y retornar un token', async () => {
    const req = await request(app.getHttpServer()).post('/auth/signin').send({email: 'prueba@mail.com', password: 'Catalunia2502*'})
    .expect((res) => {
      expect(res.body).toHaveProperty('token')
      expect(res.body.token).toBeDefined()
    })
  })
  
  afterAll(async () =>{
    if (app) { 
      await app.close();
    }
  })


  it('Post /auth/singup debe crear un nuevo usuario con status code OK', async () => {
    const req = await request(app.getHttpServer()).post('/auth/signup').send({
      name:'Testing',
      email: 'test2@mail.com',
      password:'Henrybestcode4586!',
      confirmPassword:'Henrybestcode4586!',
      address:'calleCualquiera25',
      phone: 45856952,
      country: 'miCasa',
      city: 'Tucasa'
    })

    expect(req.status).toBe(201)
    expect(req.body).toBeInstanceOf(Object)
  })

  it('Post /products debe crear un producto', async() => {
    const req = await request(app.getHttpServer()).post('/products').send({
      name: "zapas",
      description: "nike",
      price: 500,
      stock: 125,
      imgUrl: "https://www.freepik.com/free-photos-vectors/nike"
    })
    console.log(req.body)

    expect(req.status).toBe(201)
    expect(req.body).toBeInstanceOf(Object)
  })

  it('Get /products debe retornar los productos', async () => {
    const req = await request(app.getHttpServer()).get('/products')
    console.log(req.body)

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object)
  })
});
