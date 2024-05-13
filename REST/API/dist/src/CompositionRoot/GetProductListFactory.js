"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductListFactory = void 0;
const GetProductListController_1 = require("../Controllers/GetProductListController");
const MySQLSource_1 = require("../Data/Database/MySQL/MySQLSource");
const GetProductListRepository_1 = require("../Data/Repositories/GetProductListRepository");
const ProductListDomainMapper_1 = require("../Data/Repositories/Mappers/ProductListDomainMapper");
const GetProductsList_1 = require("../Domain/UseCases/GetProductsList");
const MySQLConnector_1 = require("../Infraestructure/Database/MySQLConnector");
class GetProductListFactory {
    static create() {
        return new GetProductListController_1.GetProductListController(GetProductListFactory.createUseCase());
    }
    static createUseCase() {
        return new GetProductsList_1.GetProductList(GetProductListFactory.createRepository());
    }
    static createRepository() {
        return new GetProductListRepository_1.GetProductListRepository(GetProductListFactory.createDataSource(), new ProductListDomainMapper_1.ProductListDomainMapper());
    }
    static createDataSource() {
        return new MySQLSource_1.MySQLSource(GetProductListFactory.createConnector());
    }
    static createConnector() {
        return MySQLConnector_1.MySQLConnector.getInstance();
    }
}
exports.GetProductListFactory = GetProductListFactory;
