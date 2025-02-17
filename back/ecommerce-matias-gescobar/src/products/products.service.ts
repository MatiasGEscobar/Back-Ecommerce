import { Injectable } from '@nestjs/common'
import { ProductsRepository } from './products.repository'
import { Product } from 'src/entities/products.entity';

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
    
createProduct (createProduct: Product){ 
    return this.productRepository.createProduct (createProduct) 
}
    
updateProduct (id: string, updateProduct: Product){                          
    return this.productRepository.updateProduct(id, updateProduct);
}
    
deleteProduct (id: string){                                          
    return this.productRepository.deleteProduct(id);
}

    
}
