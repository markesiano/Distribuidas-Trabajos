import { IDataEndpointPatch } from "../../Interfaces/IDataEndpointPatch";
import { IConnectorDB } from "../../Interfaces/IConnectorDB";
export class MySQLEndpointPatch implements IDataEndpointPatch {

    private connector: IConnectorDB;

    constructor(connector: IConnectorDB) {
        this.connector = connector;
    }

    async patchProductStock(id: string, stock: number): Promise<any> {
        try{
            console.log(stock);
            const query = `UPDATE products SET stock = ${stock}  WHERE id = '${parseInt(id)}'`;
            const result = await this.connector.makeDBConsult(query);
            return result;
        }catch(error){
            throw error;
        }

    }
}