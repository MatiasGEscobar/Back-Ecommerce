import { Injectable } from '@nestjs/common'
import { ProductsRepository } from './products.repository'

@Injectable()
export class ProductService{
constructor (private productRespository:ProductsRepository){}

    getProducts(){
        return this.productRespository.getProducts();
    }
}
