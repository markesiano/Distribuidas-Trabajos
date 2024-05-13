import { IPostProductRepository } from "../Interfaces/IPostProductRepository";
export class PostProduct {

    private repository: IPostProductRepository;

    constructor(repository: IPostProductRepository) {
        this.repository = repository;
    }

    async excecute(data: any): Promise<any>{
        try{
            const result = await this.repository.save(data);
            return result;
        }catch(error){
            throw error;
        }
    }
}