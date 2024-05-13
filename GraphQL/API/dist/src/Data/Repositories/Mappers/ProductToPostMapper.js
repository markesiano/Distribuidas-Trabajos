"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductToPostMapper = void 0;
const ProductBuilder_1 = require("../Builders/ProductBuilder");
class ProductToPostMapper {
    map(data) {
        const productSource = JSON.parse(JSON.stringify(data));
        const product = new ProductBuilder_1.ProductBuilder("0", productSource.name, productSource.description, productSource.price, productSource.stock, false).build();
        return product;
    }
}
exports.ProductToPostMapper = ProductToPostMapper;
