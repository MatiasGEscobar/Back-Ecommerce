import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProductService } from "./products.service";
import { Product } from "../entities/products.entity";
import { validateProductInteceptor } from "../interceptors/validateProduct.interceptor";
import { AuthGuard } from "../guards/auth.guard";
import { Roles } from "../decorators/roles.decorators";
import { Role } from "../roles.enum";
import { RolesGuard } from "../guards/roles.guard";
import { createProductDto } from "../dtos/CreateProductDto";


@Controller('products')
export class ProductController{
    constructor (private readonly ProductService:ProductService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getProducts(@Query('page') page: number = 1, @Query('limit') limit: number = 5){
        return this.ProductService.getProducts(page, limit);
    }

    @Get('seeder')
    addProducts(){
        return this.ProductService.addProducts()
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getProductById(@Param('id', ParseUUIDPipe) id:string){
       return this.ProductService.getProductById(id);
    }
    
    @Post()
    @UseInterceptors(validateProductInteceptor)
    @HttpCode(HttpStatus.CREATED)
    createProduct(@Body() createProduct : createProductDto){
       return this.ProductService.createProduct(createProduct);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(validateProductInteceptor)
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() product: createProductDto){
        return this.ProductService.updateProduct(id, product);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    deleteProduct(@Param('id', ParseUUIDPipe) id:string){
        return this.ProductService.deleteProduct(id);
    }
}
