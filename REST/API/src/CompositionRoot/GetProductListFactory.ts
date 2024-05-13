import { GetProductListController } from "../Controllers/GetProductListController";
import { MySQLSource } from "../Data/Database/MySQL/MySQLSource";
import { GetProductListRepository } from "../Data/Repositories/GetProductListRepository";
import { ProductListDomainMapper } from "../Data/Repositories/Mappers/ProductListDomainMapper";
import { GetProductList } from "../Domain/UseCases/GetProductsList";
import { MySQLConnector } from "../Infraestructure/Database/MySQLConnector";

export class GetProductListFactory {

    static create(): GetProductListController {

        return new GetProductListController(GetProductListFactory.createUseCase());
    }

    private static createUseCase(): GetProductList {
        return new GetProductList(GetProductListFactory.createRepository());
    }

    private static createRepository(): GetProductListRepository {
        return new GetProductListRepository(GetProductListFactory.createDataSource(), new ProductListDomainMapper());
    }
    private static createDataSource(): MySQLSource{
        return new MySQLSource(GetProductListFactory.createConnector());
    }
    private static createConnector(): MySQLConnector{
        return MySQLConnector.getInstance();
    } 
}