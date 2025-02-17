import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { User } from 'src/entities/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import { Order } from 'src/entities/orders.entity';
import { ProductsRepository } from 'src/products/products.repository';
import { ordersRepository } from './orders.repository';
import { OrderDetail } from 'src/entities/orderDetails.entity';

@Module({imports: [TypeOrmModule.forFeature([Order]),
                  TypeOrmModule.forFeature([Product]),
                  TypeOrmModule.forFeature([User]),
                  TypeOrmModule.forFeature([OrderDetail])],
  controllers: [OrdersController],
  providers: [OrdersService, ordersRepository],
})
export class OrdersModule {}

