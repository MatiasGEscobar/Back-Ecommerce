import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Product } from "src/entities/products.entity";

export class createOrderDto {
    
    @IsNotEmpty()
    @IsUUID(4)
    userId: string

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    products: Partial<Product[]>;
}