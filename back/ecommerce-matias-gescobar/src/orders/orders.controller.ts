import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { createOrderDto } from 'src/dtos/CreateOrderDto';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  addOrder(@Body() order: createOrderDto) {
    const {userId, products} = order
    return this.ordersService.addOrder(userId, products);
  }

  @Get(':id')
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrder(id);
  }

}
