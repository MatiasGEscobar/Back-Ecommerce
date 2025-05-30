import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/products.entity';
import { User } from '../entities/users.entity';
import { Order } from '../entities/orders.entity';
import { ordersRepository } from './orders.repository';
import { OrderDetail } from '../entities/orderDetails.entity';

@Module({imports: [TypeOrmModule.forFeature([Order]),
                  TypeOrmModule.forFeature([Product]),
                  TypeOrmModule.forFeature([User]),
                  TypeOrmModule.forFeature([OrderDetail])],
  controllers: [OrdersController],
  providers: [OrdersService, ordersRepository],
})
export class OrdersModule {}

