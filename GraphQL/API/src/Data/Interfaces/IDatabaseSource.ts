import { ProductDTO } from "../DTOs/ProductDTO";
export interface IDatabaseSource{
    getProductsList(limit: number, offset: number): Promise<[ProductDTO]>;
}
