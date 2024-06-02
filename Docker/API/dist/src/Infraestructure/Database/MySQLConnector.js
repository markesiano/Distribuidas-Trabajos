"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLConnector = void 0;
const MySQLConexion_1 = __importDefault(require("./Connectors/MySQLConexion"));
class MySQLConnector {
    constructor() {
        this.connection = MySQLConexion_1.default;
    }
    static getInstance() {
        if (!MySQLConnector.instance) {
            MySQLConnector.instance = new MySQLConnector();
        }
        return MySQLConnector.instance;
    }
    makeDBConsult(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                console.log("Consultando base de datos");
                this.connection.query(query, (err, rows) => {
                    if (err) {
                        console.log("Error en la conexion");
                        reject(err);
                    }
                    console.log("Conexion exitosa");
                    resolve(rows);
                });
            });
        });
    }
}
exports.MySQLConnector = MySQLConnector;
