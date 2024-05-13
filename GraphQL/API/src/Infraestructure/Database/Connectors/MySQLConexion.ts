import dbConfig from "../../../../config/db.config";
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.PORT,
    ssl: dbConfig.SSL
});



export default connection;