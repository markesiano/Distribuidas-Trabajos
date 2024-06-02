"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductBuilder = void 0;
const Product_1 = require("../../../Domain/Entities/Product");
class ProductBuilder {
    constructor(id, name, description, price, stock, status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.status = status;
    }
    build() {
        return new Product_1.Product(this.id, this.name, this.description, this.price, this.stock, this.status);
    }
}
exports.ProductBuilder = ProductBuilder;
