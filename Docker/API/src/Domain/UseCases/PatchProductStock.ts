import { IPatchProductStockRepository } from "../Interfaces/IPatchProductRepository";
export class PatchProductStock {
    private repository: IPatchProductStockRepository;

    constructor(repository: IPatchProductStockRepository) {
        this.repository = repository;
    }

    async excecute(id: string, stock: number): Promise<any>{
        try{
            const result = await this.repository.update(id, stock);
            return result;
        }catch(error){
            throw error;
        }
    }

}