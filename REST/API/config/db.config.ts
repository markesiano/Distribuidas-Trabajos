import fs from 'fs';
export default {
    HOST: "azf-products-jjj-server.mysql.database.azure.com",
    USER: "zvhkajeaaq",
    PASSWORD: "wWH$S1EvlSIqfhE2",
    DB: "store",
    PORT: 3306,
    SSL: {ca: fs.readFileSync("./config/DigiCertGlobalRootCA.crt.pem".toString())}
  };