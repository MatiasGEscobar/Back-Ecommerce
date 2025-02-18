import { InjectRepository } from "@nestjs/typeorm";
import { UploadApiResponse, v2 } from "cloudinary";
import { Repository } from "typeorm";
import * as toStream from "buffer-to-stream";
import { Product } from "src/entities/products.entity";
import { NotFoundException } from "@nestjs/common";

export class CloudinaryRepository{
    constructor(
        @InjectRepository(Product) private productsRepository: Repository<Product>
    ){}

    async uploadImage(id: string, file: Express.Multer.File): Promise<Product> {
        
        const product = await this.productsRepository.findOneBy({ id })

        if(!product){
            throw new NotFoundException('Producto no encontrado');
        }

        try {

            const uploadResult = await this.uploadToCloudinary(file); // Subir la imagen a Cloudinary
            product.imgUrl = uploadResult.secure_url; // Actualizar la URL de la imagen en el producto
            await this.productsRepository.save(product); // Guardar los cambios en la base de datos
            return product;

        } catch (error) {
            
            throw new Error(`Error al subir la imagen: ${error.message}`);
        }
    }

    private uploadToCloudinary(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream(
                { resource_type: 'auto' },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            toStream(file.buffer).pipe(upload);
        });
    }
}