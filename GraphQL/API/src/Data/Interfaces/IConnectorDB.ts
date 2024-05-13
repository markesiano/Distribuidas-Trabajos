import { ProductDTO } from "../DTOs/ProductDTO";
export interface IConnectorDB{
    makeDBConsult(query: string): Promise<[ProductDTO]>;
}