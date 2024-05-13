import { Product } from "../../../Domain/Entities/Product";
export class ProductBuilder {
    private id: string;
    private name: string;
    private description: string | "";
    private price: number;
    private stock: number;
    private status: boolean;

    constructor(id: string, name: string, description: string | "", price: number, stock: number, status: boolean) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.status = status;
    }

    build(): Product {

        return new Product(this.id, this.name,this.description, this.price, this.stock, this.status);

    }
}