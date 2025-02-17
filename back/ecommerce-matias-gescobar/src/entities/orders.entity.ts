import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { OrderDetail } from "./orderDetails.entity";
import { User } from "./users.entity";

@Entity({
    name: 'orders'
})

export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({})
    date: Date

    @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
    orderDetail: OrderDetail;

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: User;
}