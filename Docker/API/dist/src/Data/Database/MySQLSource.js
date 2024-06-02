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
exports.MySQLSource = void 0;
class MySQLSource {
    constructor(connector) {
        this.connector = connector;
    }
    getProductsList(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM products LIMIT ${limit} OFFSET ${offset}`;
            const result = yield this.connector.makeDBConsult(query);
            console.log("Database Source creado");
            return result;
        });
    }
}
exports.MySQLSource = MySQLSource;
