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
exports.PostProductRepository = void 0;
class PostProductRepository {
    constructor(database, productToPostMapper) {
        this.database = database;
        this.productToPostMapper = productToPostMapper;
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = this.productToPostMapper.map(data);
                console.log("Data mapeada");
                const result = yield this.database.postProduct(product);
                console.log("producto guardado");
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.PostProductRepository = PostProductRepository;
