import { Product } from "../../Domain/Entities/Product";
import { IGetProductListRepository } from "../../Domain/Interfaces/IGetProducListRepository";
import { IDatabaseSource } from "../Interfaces/IDatabaseSource";
import { ProductListDomainMapper } from "./Mappers/ProductListDomainMapper";

export class GetProductListRepository implements IGetProductListRepository {
    private database: IDatabaseSource;
    private ProductListDomainMapper: ProductListDomainMapper;

    constructor(database: IDatabaseSource, productListDomainMapper: ProductListDomainMapper) {
        this.database = database;
        this.ProductListDomainMapper = productListDomainMapper;
    }

    async find(limit: number, offset: number): Promise<Product[]> {
        try{
            const result = await this.database.getProductsList(limit, offset);
            let products: Product[] = [];
            products = this.ProductListDomainMapper.map(result);
            console.log("Repository creado");
            return products;
        }catch(error){
            throw error;
        }

        // We need to implement the logic to get the products from the database

    }

}