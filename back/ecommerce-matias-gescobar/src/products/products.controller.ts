import { Controller, Get } from "@nestjs/common";
import { ProductService } from "./products.service";


@Controller('products')
export class ProductController{
    constructor (private readonly ProductService:ProductService) {}

    @Get()
    getProducts(){
        return this.ProductService.getProducts();
    }
}
