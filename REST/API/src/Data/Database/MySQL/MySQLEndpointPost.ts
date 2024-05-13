import { IDataEndpointPost } from "../../Interfaces/IDataEndpointPost";
import { IConnectorDB } from "../../Interfaces/IConnectorDB";
import { Product } from "../../../Domain/Entities/Product";

export class MySQLEndpointPost implements IDataEndpointPost{
    private connector: IConnectorDB;

    constructor(connector: IConnectorDB){
        this.connector = connector;
    }

    async postProduct(product: Product): Promise<any> {
        try{
            const query = `INSERT INTO products (name, description, price, stock, status) VALUES ('${product.name}', '${product.description}', ${product.price}, ${product.stock}, ${1})`;
            const result = await this.connector.makeDBConsult(query);
            console.log("Database Source creado");
            return result;
        }
        catch(error){
            throw error;
        }
    }
}