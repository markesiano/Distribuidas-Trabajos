import { Product } from "../../../Domain/Entities/Product";
import { ProductBuilder } from "../Builders/ProductBuilder";

export class ProductToPostMapper {
    map(data: any): Product{
        const productSource = JSON.parse(JSON.stringify(data));
        const product = new ProductBuilder("0", productSource.name, productSource.description, productSource.price, productSource.stock, false).build();
        return product;
    }
}