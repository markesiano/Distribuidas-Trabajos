"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductListDomainMapper = void 0;
const ProductBuilder_1 = require("../Builders/ProductBuilder");
class ProductListDomainMapper {
    map(productsList) {
        let products = [];
        products = productsList.map((product) => {
            if (product.status === 0)
                product.status = false;
            if (product.status === 1)
                product.status = true;
            const productBuilder = new ProductBuilder_1.ProductBuilder(product.id, product.name, product.description, product.price, product.stock, product.status);
            return productBuilder.build();
        });
        return products;
    }
}
exports.ProductListDomainMapper = ProductListDomainMapper;
