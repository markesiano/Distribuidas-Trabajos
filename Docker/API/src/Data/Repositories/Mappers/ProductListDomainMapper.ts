import { Product } from '../../../Domain/Entities/Product';
import { ProductBuilder } from '../Builders/ProductBuilder';
import { ProductDTO } from '../../DTOs/ProductDTO';
export class ProductListDomainMapper {
    map(productsList: ProductDTO[]): Product[] {

            let products: Product[] = [];
            products = productsList.map((product: any) => {

                if(product.status === 0) product.status = false;
                if(product.status === 1) product.status = true;
                const productBuilder = new ProductBuilder(product.id, product.name, product.description, product.price, product.stock, product.status);
                return productBuilder.build();
            });
            return products;

    }
}