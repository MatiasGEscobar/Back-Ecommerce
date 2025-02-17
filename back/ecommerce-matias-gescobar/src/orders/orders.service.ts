import { Injectable } from '@nestjs/common';
import { ordersRepository } from './orders.repository';


@Injectable()
export class OrdersService {
  constructor (private ordersRepository : ordersRepository){}

  addOrder(userId: string, products: any) {
    return this.ordersRepository.addOrder(userId, products)
  }

  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }

  
}
