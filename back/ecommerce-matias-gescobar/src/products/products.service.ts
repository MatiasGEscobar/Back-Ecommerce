import { Injectable } from '@nestjs/common'
import { ProductsRepository } from './products.repository'
import { Product } from '../entities/products.entity';
import { createProductDto } from '../dtos/CreateProductDto';

@Injectable()
export class ProductService{
constructor (private productRepository : ProductsRepository){}

getProducts(page: number, limit: number) { 
    return this.productRepository.getProducts(page,limit);
}
    
getProductById(id: string){               
    const productFound = this.productRepository.getById(id);
        if (!productFound){
            return undefined;
        }
        return productFound;
} 

addProducts() {
    return this.productRepository.addProducts()
}
    
createProduct (createProduct: createProductDto){ 
    return this.productRepository.createProduct (createProduct)
    console.log(this.productRepository)
}
    
updateProduct (id: string, product: createProductDto){                          
    return this.productRepository.updateProduct(id, product);
}
    
deleteProduct (id: string){                                          
    return this.productRepository.deleteProduct(id);
}

    
}
