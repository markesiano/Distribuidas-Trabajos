import { Product } from "../Entities/Product";
export interface IGetProductListRepository{
    find(limit: number, offset: number): Promise<Product[]>;
}