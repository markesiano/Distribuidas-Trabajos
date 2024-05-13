import { IPostProductRepository } from "../../Domain/Interfaces/IPostProductRepository";
import { ProductToPostMapper } from "./Mappers/ProductToPostMapper";
import { IDataEndpointPost } from "../Interfaces/IDataEndpointPost";
export class PostProductRepository implements IPostProductRepository {

    private database: IDataEndpointPost;
    private productToPostMapper: ProductToPostMapper;

    constructor(database: IDataEndpointPost, productToPostMapper: ProductToPostMapper) {
        this.database = database;
        this.productToPostMapper = productToPostMapper;
    }

    async save(data: any): Promise<any> {
        try{
            const product = this.productToPostMapper.map(data);
            console.log("Data mapeada");
            const result = await this.database.postProduct(product);
            console.log("producto guardado");

            return result;
        }catch(error){
            throw error;
        }
    }



}