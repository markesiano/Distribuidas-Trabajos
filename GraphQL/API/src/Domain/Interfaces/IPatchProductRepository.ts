export interface IPatchProductStockRepository {
    update(id: string, stock: number): Promise<any>;
} 