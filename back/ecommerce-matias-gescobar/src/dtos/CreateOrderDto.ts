import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Product } from "src/entities/products.entity";

export class createOrderDto {
    
    @ApiProperty({
        description: 'Id del Usuario',
        example: '5a5d10a6-30b4-4cad-8c6f-32389d490c7f'
    })
    @IsNotEmpty()
    @IsUUID(4)
    userId: string

    @ApiProperty({
        description: 'Listado de Productos',
        example: `[
        {
            "id": "562df30d-ccfc-40d2-990e-e2d73547ac24",
            "name": "Razer BlackWidow V3",
            "description": "The best keyboard in the world",
            "price": "99.99",
            "stock": "99.99",
            "imgUrl": "https://www.flaticon.es/icono-gratis/imagen-rota_13434972"
	    },
	    {
		    "id": "01cb2b12-ef99-465d-bf1c-57c554cce63c",
		    "name": "Logitech G502 Pro",
		    "description": "The best mouse in the world",
		    "price": "39.99",
		    "stock": "39.99",
		    "imgUrl": "https://www.flaticon.es/icono-gratis/imagen-rota_13434972"
        }]`
    })
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    products: Partial<Product[]>;
}