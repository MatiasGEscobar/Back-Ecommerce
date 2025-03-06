import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../entities/categories.entity";
import * as data from "../utils/seeders/Archivo actividad 3.json";
import { Product } from "../entities/products.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { createProductDto } from "../dtos/CreateProductDto";


export class ProductsRepository{
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ){}

async getProducts(page : number = 1, limit: number = 5): Promise <Product[]>{
    const products = await this.productsRepository.find({
        relations: {
            category: true,
        },
    })

    let inStock = products.filter((product) => product.stock > 0)

    const startIndex = (page -1 ) * limit
    const endIndex = startIndex + +limit

    inStock = inStock.slice(startIndex, endIndex)

    return inStock
}

async getById(id : string) : Promise<Product | undefined>{
    const product = await this.productsRepository.findOneBy({ id })

    if(!product){
        throw new NotFoundException('Producto no Encontrado')
    }
    return product
}

async addProducts() {
    const categories = await this.categoriesRepository.find()               //BUSCO TODAS LAS CATEGORIAS

    data?.map(async (element) => {                                          //MAPEO LA BDD Y COMPARO CADA NOMBRE DE DE LAS CATEGORIAS QUE TENGO EN MI BDD CON LA CON CADA CATEGORIA DE PRODUCTOS QUE TIENE EL ARCHIVO MOCKEADO
        const relatedCategory = categories.find(
            (category) => category.name === element.category,
        )

        if(!relatedCategory){
            const newCategory = this.categoriesRepository.create({
                name: element.category,
            })
            await this.categoriesRepository.save(newCategory)

            const product = new Product()                                       //CREAMOS UN NUEVO PRODUCTO
            product.name = element.name                                         //CARGAMOS LOS DATOS PROVENIENTES DEL ARCHIVO MOCKEADO (CON SUS PRODUCTOS) A LA BDD, RELACIONAMOS LA CATEGORIA TAMBIEN
            product.description = element.description
            product.price = element.price
            product.stock = element.price
            product.category = newCategory

            await this.productsRepository
            .createQueryBuilder()
            .insert()
            .into(Product)                                                      //INSERTA DENTRO DE LA BDD
            .values(product)                                                    //LOS VALORES AGREGADOS AL NUEVO PRODUCTO
            .orUpdate(['description', 'price', 'stock'], ['name'])              //SOLO ACTUALIZA LOS DATOS QUE VEMOS.
            .execute()
        }

        const product = new Product()                                       //CREAMOS UN NUEVO PRODUCTO
        product.name = element.name                                         //CARGAMOS LOS DATOS PROVENIENTES DEL ARCHIVO MOCKEADO (CON SUS PRODUCTOS) A LA BDD, RELACIONAMOS LA CATEGORIA TAMBIEN
        product.description = element.description
        product.price = element.price
        product.stock = element.price
        product.category = relatedCategory


        await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Product)                                                      //INSERTA DENTRO DE LA BDD
        .values(product)                                                    //LOS VALORES AGREGADOS AL NUEVO PRODUCTO
        .orUpdate(['description', 'price', 'stock'], ['name'])              //SOLO ACTUALIZA LOS DATOS QUE VEMOS.
        .execute()
    })

    return "Productos agregados"
}

async createProduct(product: createProductDto): Promise <createProductDto>{
    const newProduct = await this.productsRepository.save(product)

    return newProduct;
}

async updateProduct(id : string, product: createProductDto){
    const serchProduct = await this.productsRepository.findOneBy ({ id })

    if(!serchProduct){
        throw new BadRequestException( "El producto no existe, debe Crearlo")
    }

    await this.productsRepository.update(id, product)

    const updateProduct = await this.productsRepository.findOneBy ({ id })

    return `Producto Actualizado: ${updateProduct}`
}

async deleteProduct(id : string): Promise<Partial<Product>>{
    const product = await this.productsRepository.findOneBy({ id })

    if(!product){
        throw new NotFoundException ("Producto no encontrado")
    }

    this.productsRepository.remove(product)

    return product
}
}