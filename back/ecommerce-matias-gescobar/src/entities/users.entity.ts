import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { Order } from "./orders.entity";

@Entity({
    name: 'users'
})

export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    name: string

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true,
        unique: true,
    })
    email: string

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
    })
    password: string

    @Column({
        type: "numeric"
    })
    phone: number

    @Column({
        type: 'varchar',
        length: 50,
    })
    country: string

    @Column({
        type: 'varchar',
    })
    address: string

    @Column({
        type: 'varchar',
        length: 50,
    })
    city: string

    @OneToMany(() => Order, (order) => order.user)
    @JoinColumn({name: 'orders_id'})
    orders: Order[];

}