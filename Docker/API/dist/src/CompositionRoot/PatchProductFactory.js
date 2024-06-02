"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchProductFactory = void 0;
const MySQLEndpointPatch_1 = require("../Data/Database/MySQL/MySQLEndpointPatch");
const PatchProductStock_1 = require("../Domain/UseCases/PatchProductStock");
const PatchProductController_1 = require("../Controllers/PatchProductController");
const MySQLConnector_1 = require("../Infraestructure/Database/MySQLConnector");
const PatchProductStockRepository_1 = require("../Data/Repositories/PatchProductStockRepository");
class PatchProductFactory {
    static create() {
        return new PatchProductController_1.PatchProductController(PatchProductFactory.createUseCase());
    }
    static createUseCase() {
        return new PatchProductStock_1.PatchProductStock(PatchProductFactory.createRepository());
    }
    static createRepository() {
        return new PatchProductStockRepository_1.PatchProductStockRepository(PatchProductFactory.createDataSource());
    }
    static createDataSource() {
        return new MySQLEndpointPatch_1.MySQLEndpointPatch(PatchProductFactory.createConnector());
    }
    static createConnector() {
        return MySQLConnector_1.MySQLConnector.getInstance();
    }
}
exports.PatchProductFactory = PatchProductFactory;
