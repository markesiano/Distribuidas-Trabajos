export interface IDataEndpointPatch {
    patchProductStock(id: string, stock: number): Promise<any>;
}
