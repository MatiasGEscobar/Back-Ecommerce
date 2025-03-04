import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesRepository } from '../categories/categories.repository';
import { Product } from '../entities/products.entity';
import { Category } from '../entities/categories.entity';

@Module({imports: [TypeOrmModule.forFeature([Product, Category])],
    providers: [
      ProductService,
      ProductsRepository,
      CategoriesRepository
    ],
    controllers: [ProductController],
    exports: [ProductService, ProductsRepository]
})
export class ProductsModule {
}
