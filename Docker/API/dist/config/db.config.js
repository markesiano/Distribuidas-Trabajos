"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
exports.default = {
    HOST: "azf-products-jjj-server.mysql.database.azure.com",
    USER: "zvhkajeaaq",
    PASSWORD: "wWH$S1EvlSIqfhE2",
    DB: "store",
    PORT: 3306,
    SSL: { ca: fs_1.default.readFileSync("./config/DigiCertGlobalRootCA.crt.pem".toString()) }
};
