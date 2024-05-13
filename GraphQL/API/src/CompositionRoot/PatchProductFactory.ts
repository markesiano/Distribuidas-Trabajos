import { MySQLEndpointPatch } from "../Data/Database/MySQL/MySQLEndpointPatch";
import { PatchProductStock } from "../Domain/UseCases/PatchProductStock";
import { PatchProductController } from "../Controllers/PatchProductController";
import { MySQLConnector } from "../Infraestructure/Database/MySQLConnector";
import { PatchProductStockRepository } from "../Data/Repositories/PatchProductStockRepository";

export class PatchProductFactory {

    static create(): PatchProductController {
        return new PatchProductController(PatchProductFactory.createUseCase());
    }

    private static createUseCase(): PatchProductStock {
        return new PatchProductStock(PatchProductFactory.createRepository());
    }

    private static createRepository(): PatchProductStockRepository {
        return new PatchProductStockRepository(PatchProductFactory.createDataSource());
    }

    private static createDataSource(): MySQLEndpointPatch{
        return new MySQLEndpointPatch(PatchProductFactory.createConnector());
    }

    private static createConnector(): MySQLConnector{
        return MySQLConnector.getInstance();
    }


}