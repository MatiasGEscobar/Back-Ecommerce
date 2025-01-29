import { Injectable } from "@nestjs/common";
import { Product } from "./products.entity";


@Injectable()
export class ProductsRepository{
    private products: Product[] = [];

async getProducts(){
    return this.products
}
}