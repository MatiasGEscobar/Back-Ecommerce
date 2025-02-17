import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { Category } from "./categories.entity";
import { OrderDetail } from "./orderDetails.entity";

@Entity({
    name: 'products'
})

export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true 
    })
    name: string

    @Column({
        type: 'varchar',
        nullable: true,
    })
    description: string

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    price: number;

    @Column({
        type: "numeric",
        nullable: true,
    })
    stock: number

    @Column({
        type: 'varchar',
        default: 'https://www.flaticon.es/icono-gratis/imagen-rota_13434972'
    })
    imgUrl: string

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
        category: Category;

    @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
        orderDetail: OrderDetail[];

}