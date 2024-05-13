import { IDataEndpointPatch } from "../Interfaces/IDataEndpointPatch";
export class PatchProductStockRepository {
    private database: IDataEndpointPatch;
    
    constructor(database: IDataEndpointPatch) {
        this.database = database;
    }

    async update(id: string, stock: number): Promise<any> {
        try{
            console.log("Stock desde Repository: "+ stock);
            const result = await this.database.patchProductStock(id, stock);
            return result;
        }catch(error){
            throw error;
        }




    }
}