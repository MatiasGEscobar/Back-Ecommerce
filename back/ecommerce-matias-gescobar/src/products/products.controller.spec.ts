import { ProductController } from "./products.controller";
import { Test } from "@nestjs/testing";
import { ProductService } from "./products.service";
import { Product } from "../entities/products.entity";
import { AuthGuard } from "../guards/auth.guard";
import { Category } from "../entities/categories.entity";
import { JwtService } from "@nestjs/jwt";

describe('productsController', () => {
    let productController: ProductController;
    let mockProductService: Partial<ProductService>            // servicio de prueba

    const mockProduct: Partial<Product[]> = [{                   //usuario de prueba
        id:'1',
        name: 'Prueba',
        description: 'Producto de Prueba',
        price: 50,
        stock: 100,
        imgUrl: 'www.imagenrota.com',
        category: new Category ,
        orderDetail: []
    }]
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [ProductController],
            providers:[{
                provide: ProductService,
                useValue: {
                    getProducts: jest.fn().mockResolvedValue(mockProduct),
                    getProductById: jest.fn().mockResolvedValue(mockProduct[0])
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


        productController = module.get<ProductController>(ProductController);
        mockProductService = module.get<ProductService>(ProductService);
    })

    it('Create a instance of ProductController', () => {
        expect(productController).toBeDefined();
    });

    it('deberia retornar una lista de usuarios y el servicio ser llamado', async () => {
        const result = await productController.getProducts();
        expect(result).toEqual(mockProduct);
        expect(mockProductService.getProducts).toHaveBeenCalled()
    });

    it('deberia retornar un usuario y el servicio ser llamado', async () => {
        const result = await productController.getProductById('1');
        expect(result).toEqual(mockProduct[0]);
        expect(mockProductService.getProductById).toHaveBeenCalledWith('1')
    });


})