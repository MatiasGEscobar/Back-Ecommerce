import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { Product } from "src/entities/products.entity";

export class PartialProductDto extends PartialType(Product) {}
export class createOrderDto {
    
    @IsNotEmpty()
    @IsUUID(4)
    userId: string

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => PartialProductDto)
    products: PartialProductDto[];
}