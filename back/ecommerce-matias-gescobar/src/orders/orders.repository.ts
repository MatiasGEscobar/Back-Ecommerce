import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetail } from "src/entities/orderDetails.entity";
import { Order } from "src/entities/orders.entity";
import { Product } from "src/entities/products.entity";
import { User } from "src/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class ordersRepository {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository(OrderDetail)
        private orderDetailRepository: Repository<OrderDetail>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {}

async addOrder(userId: string, products: any){
    let total = 0;
    const user = await this.userRepository.findOneBy({ id: userId})

    if(!user){
        return 'User not Found';
    }

    const order = new Order()
    order.date = new Date()
    order.user = user

    const newOrder = await this.ordersRepository.save(order)

    const productArray = await Promise.all(
        products.map(async (element) => {
            const product = await this.productRepository.findOneBy({
                id: element.id,
            })

            if(!product){
                return 'Product not Found'
            }

            if (product.stock === 0){
                return 'Product without stock!'
            }

            total += Number(product.price)
            
            await this.productRepository.update(
                {id: element.id},
                {stock: product.stock - 1},
            )

            return product
        }),
    )

    const orderDetail = new OrderDetail()

    orderDetail.price = Number(Number(total).toFixed(2))
    orderDetail.products = productArray
    orderDetail.order = newOrder

    await this.ordersRepository.save(orderDetail)

    return await this.ordersRepository.find({
        where:{ id: newOrder.id },
        relations: {
            orderDetail: true,
        },
    })
}

getOrder(id: string) {
    const order = this.ordersRepository.findOne({
        where: { id },
        relations: {
            orderDetail: {
                products: true,
            },
        },
    })

    if(!order){
        return 'Order not Found'
    }

    return order
}
}