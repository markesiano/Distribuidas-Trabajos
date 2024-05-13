import mariadb from 'mariadb';

import dotenv from 'dotenv';

dotenv.config({
    path: '/home/markesiano/Documents/distribuidas/sockets/server/.env'
});
const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
}

class DBConnector{
    dbconnector = mariadb.createPool(config);


    async query(params) {
    var conn = await this.dbconnector.getConnection();

    return new Promise((resolve, reject) => {
        conn.query(params)
        .then(data => {
            console.log(data);
            resolve(data); // resolvemos la promesa con el resultado de la consulta
            conn.end();
        })
        .catch(err => {
            console.log(err);
            reject(err); // rechazamos la promesa con el error
            conn.end();
        });
    });
    }



}
export default new DBConnector();
