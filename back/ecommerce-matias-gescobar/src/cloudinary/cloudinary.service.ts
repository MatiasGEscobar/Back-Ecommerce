import { Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryRepository } from './cloudinary.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CloudinaryService {
    constructor(
        private readonly cloudinaryRepository: CloudinaryRepository,
        @InjectRepository(Product) private readonly productsRepository: Repository<Product>
    ){}

    async uploadImage(file: Express.Multer.File, id: string): Promise<Product> {
        
        const product = await this.productsRepository.findOneBy({ id })

        if(!product){
            throw new NotFoundException('Producto no encontrado');
        }

        try {

            const uploadResult = await this.cloudinaryRepository.uploadToCloudinary(file); // Subimos la imagen a Cloudinary
            product.imgUrl = uploadResult.secure_url;                                      // Actualizamos la URL de la imagen en el producto
            await this.productsRepository.save(product);                                   // Guardamos los cambios en la base de datos
            return product;

        } catch (error) {
            
            throw new Error(`Error al subir la imagen: ${error.message}`);
        }
    }
}
