import { IPatchProductStock } from "../Domain/Interfaces/IPatchProductStock";
export class PatchProductController {
    private patchProductStockUseCase: IPatchProductStock;

    constructor(patchProductStockUseCase: IPatchProductStock){
        this.patchProductStockUseCase = patchProductStockUseCase;
    }

    async patchProductStock(id: string, stock: number){
        try{
            const result = await this.patchProductStockUseCase.excecute(id, stock);
            return result;
        } catch(error){
            throw error;
        }
    }
}