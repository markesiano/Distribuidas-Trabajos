import { Product } from "../Entities/Product";
import { IGetProductListRepository } from "../Interfaces/IGetProducListRepository";

export class GetProductList {

    private repository: IGetProductListRepository;

    constructor(repository: IGetProductListRepository) {
        this.repository = repository;
    }

    async excecute(): Promise<Product[]> {
        try{
            const result = await this.repository.find(1000, 0);
            return result;
        }catch(error){
            throw error;
        }
    }

}