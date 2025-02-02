import { Injectable } from "@nestjs/common";
import { Product } from "./products.entity";


@Injectable()
export class ProductsRepository{
    private products: Product[] = [];

async getProducts(page : number = 1, limit: number = 5): Promise <Product[]>{
    const startIndex = (page - 1) * limit;
    return await this.products.slice(startIndex, startIndex + limit)
}

getById(id : Number) : Product | undefined{
    const serchProduct = this.products.find((product) => product.id === id);
    return serchProduct;
}

async createProduct(newProduct: Product): Promise <Number>{
    const id = this.products.length + 1;
    newProduct.id = id
    this.products.push(newProduct)
    return id;
}

async updateProduct(id : Number, updateProduct : Product) : Promise <Number>{
    const index = this.products.findIndex((product) => product.id == id);
    
    this.products[index].name = updateProduct.name;
    this.products[index].description = updateProduct.description;
    this.products[index].price = updateProduct.price;
    this.products[index].stock = updateProduct.stock;
    this.products[index].imgUrl = updateProduct.imgUrl;

    return this.products[index].id;
}

async deleteProduct(id : Number): Promise<Number>{
    const index = this.products.findIndex((product) => product.id === id);
    this.products.splice(index,1);
    return id;
}
}