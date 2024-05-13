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
exports.MySQLEndpointPatch = void 0;
class MySQLEndpointPatch {
    constructor(connector) {
        this.connector = connector;
    }
    patchProductStock(id, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(stock);
                const query = `UPDATE products SET stock = ${stock}  WHERE id = '${parseInt(id)}'`;
                const result = yield this.connector.makeDBConsult(query);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.MySQLEndpointPatch = MySQLEndpointPatch;
