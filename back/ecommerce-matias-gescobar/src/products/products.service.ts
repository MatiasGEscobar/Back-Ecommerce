import { Injectable } from '@nestjs/common'
import { ProductsRepository } from './products.repository'
import { Product } from './products.entity';

@Injectable()
export class ProductService{
constructor (private productRepository : ProductsRepository){}

getProducts(page: number, limit: number): Promise <Product[]> { 
    return this.productRepository.getProducts(page,limit);
}
    
getProductById(id: Number):  Product | undefined{               
    const productFound = this.productRepository.getById(id);
        if (!productFound){
            return undefined;
        }
        return productFound;
} 
    
createProduct (createProduct : Product) : Promise <Number>{ 
    return this.productRepository.createProduct (createProduct) 
}
    
updateProduct (id: Number, updateProduct: Product): Promise <Number>{                          
    return this.productRepository.updateProduct(id, updateProduct);
}
    
deleteProduct (id: Number): Promise <Number>{                                          
    return this.productRepository.deleteProduct(id);
}

    
}
