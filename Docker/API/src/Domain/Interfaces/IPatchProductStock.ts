export interface IPatchProductStock {
    excecute(id: string, stock: number): Promise<any>; 
}