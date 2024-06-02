import connection  from "./Connectors/MySQLConexion";
import { Connection , QueryError } from "mysql2";
import { IConnectorDB } from "../../Data/Interfaces/IConnectorDB";

export class MySQLConnector implements IConnectorDB {

    private connection: Connection;
    private static instance: MySQLConnector;

    constructor(){
        this.connection = connection;
    }

    public static getInstance(): MySQLConnector {
        if (!MySQLConnector.instance) {
            MySQLConnector.instance = new MySQLConnector();
        }
        return MySQLConnector.instance;

    }
    async makeDBConsult(query: string): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log("Consultando base de datos");
            this.connection.query(query, (err: QueryError, rows: any) => {
                if (err) {
                    console.log("Error en la conexion");
                    reject(err);
                }
                console.log("Conexion exitosa");
                resolve(rows);
            });
        });

    }



}