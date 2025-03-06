import { Injectable } from '@nestjs/common';
import { ordersRepository } from './orders.repository';
import { Product } from 'src/entities/products.entity';


@Injectable()
export class OrdersService {
  constructor (private ordersRepository : ordersRepository){}

  addOrder(userId: string, products: Product[]) {
    return this.ordersRepository.addOrder(userId, products)
  }

  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }

  
}
