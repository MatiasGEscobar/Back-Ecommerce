import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { Product } from "./products.entity";

@Entity({
    name: 'categories'
})

export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    name: string

    @OneToMany(() => Product, (product) => product.category)
    @JoinColumn({ name: 'product_id' })
    products: Product[];

}