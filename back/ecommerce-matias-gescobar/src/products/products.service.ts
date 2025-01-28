import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductService{
    getProducts(){
        return "Get All Products"
    }
}
