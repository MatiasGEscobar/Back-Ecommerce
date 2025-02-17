import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { Order } from "./orders.entity";
import { Product } from "./products.entity";

@Entity({
    name: 'ordersDetails'
})

export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    price: number;

    @OneToOne(() => Order, (order) => order.orderDetail)
    @JoinColumn({ name:'order_id' })
    order: Order;

    @ManyToMany(() => Product)
    @JoinTable({
        name: 'order_detail_products'
    })
    products: Product[];
}