import { IDatabaseSource } from "../../Interfaces/IDatabaseSource";
import { ProductDTO } from "../../DTOs/ProductDTO";
import { IConnectorDB } from "../../Interfaces/IConnectorDB";



export  class MySQLSource implements IDatabaseSource{
    private connector: IConnectorDB;

    constructor(connector: IConnectorDB){
        this.connector = connector;
    }

    async getProductsList(limit: number, offset: number): Promise<[ProductDTO]> {
        const query = `SELECT * FROM products LIMIT ${limit} OFFSET ${offset}`;

        const result = await this.connector.makeDBConsult(query);
        console.log("Database Source creado");
        return result;

    }

}