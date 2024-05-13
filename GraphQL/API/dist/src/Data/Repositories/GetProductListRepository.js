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
exports.GetProductListRepository = void 0;
class GetProductListRepository {
    constructor(database, productListDomainMapper) {
        this.database = database;
        this.ProductListDomainMapper = productListDomainMapper;
    }
    find(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.database.getProductsList(limit, offset);
                let products = [];
                products = this.ProductListDomainMapper.map(result);
                console.log("Repository creado");
                return products;
            }
            catch (error) {
                throw error;
            }
            // We need to implement the logic to get the products from the database
        });
    }
}
exports.GetProductListRepository = GetProductListRepository;
