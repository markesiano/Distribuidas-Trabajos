import { Product } from "../../Domain/Entities/Product";

export interface IDataEndpointPost {
    postProduct(data: Product): Promise<any>;
}
    