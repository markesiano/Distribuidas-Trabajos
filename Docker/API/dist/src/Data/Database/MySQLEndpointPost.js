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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLEndpointPost = void 0;
class MySQLEndpointPost {
    constructor(connector) {
        this.connector = connector;
    }
    postProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `INSERT INTO products (name, description, price, stock, status) VALUES ('${product.name}', '${product.description}', ${product.price}, ${product.stock}, ${1})`;
                const result = yield this.connector.makeDBConsult(query);
                console.log("Database Source creado");
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.MySQLEndpointPost = MySQLEndpointPost;
