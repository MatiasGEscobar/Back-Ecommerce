import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { ProductsRepository } from './products.repository';

@Module({
    providers:[ProductService,ProductsRepository],
    controllers:[ProductController]
})
export class ProductsModule {
}
