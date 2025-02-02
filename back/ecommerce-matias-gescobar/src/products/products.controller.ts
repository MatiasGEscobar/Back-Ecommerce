import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProductService } from "./products.service";
import { Product } from "./products.entity";
import { validateProductInteceptor } from "src/interceptors/validateProduct.interceptor";
import { AuthGuard } from "src/auth/auth.guard";


@Controller('products')
export class ProductController{
    constructor (private readonly ProductService:ProductService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getProducts(@Query('page') page: number = 1, @Query('limit') limit: number = 5){
        return this.ProductService.getProducts(page, limit);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getProductById(@Param('id') id:string){
       return this.ProductService.getProductById(Number(id));
    }
    
    @Post()
    @UseInterceptors(validateProductInteceptor)
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    createProduct(@Body() createProduct : Product){
       return this.ProductService.createProduct(createProduct);
    }

    @Put(':id')
    @UseInterceptors(validateProductInteceptor)
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    updateProduct(@Param('id') id: string, @Body() updateProduct: Product){
        return this.ProductService.updateProduct(Number(id), updateProduct);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    deleteProduct(@Param('id') id:string){
        return this.ProductService.deleteProduct(Number(id));
    }
}
