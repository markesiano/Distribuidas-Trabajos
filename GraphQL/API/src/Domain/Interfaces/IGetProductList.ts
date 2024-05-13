import { Product } from "../Entities/Product";
export interface IGetProductList {
    excecute(): Promise<Product[]>;
}