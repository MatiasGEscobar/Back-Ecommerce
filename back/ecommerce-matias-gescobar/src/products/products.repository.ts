import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "src/entities/categories.entity";
import * as data from "../utils/seeders/Archivo actividad 3.json";
import { Product } from "src/entities/products.entity";
import { NotFoundException } from "@nestjs/common";
import { createProductDto } from "src/dtos/CreateProductDto";


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
    const categories = await this.categoriesRepository.find()

    data?.map(async (element) => {
        const relatedCategory = categories.find(
            (category) => category.name === element.category,
        )

        const product = new Product()
        product.name = element.name
        product.description = element.description
        product.price = element.price
        product.stock = element.price
        product.category = relatedCategory


        await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(product)
        .orUpdate(['description', 'price', 'stock'], ['name'])
        .execute()
    })

    return "Productos agregados"
}

async createProduct(product: Partial<Product>): Promise <Partial<Product>>{
    const newProduct = await this.productsRepository.save(product)

    return newProduct;
}

async updateProduct(id : string, product: createProductDto){
    await this.productsRepository.update(id, product)

    const updateProduct = await this.productsRepository.findOneBy ({ id })

    return updateProduct
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