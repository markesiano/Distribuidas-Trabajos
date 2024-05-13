import { MySQLConnector } from "../Infraestructure/Database/MySQLConnector";
import { PostProduct } from "../Domain/UseCases/PostProduct";
import { PostProductController } from "../Controllers/PostProductController";
import { PostProductRepository } from "../Data/Repositories/PostProductRepository";
import { ProductToPostMapper } from "../Data/Repositories/Mappers/ProductToPostMapper";
import { MySQLEndpointPost } from "../Data/Database/MySQL/MySQLEndpointPost";

export class PostProductFactory {

    static create(): PostProductController {

        return new PostProductController(PostProductFactory.createUseCase());
    }

    private static createUseCase(): PostProduct {
        return new PostProduct(PostProductFactory.createRepository());
    }

    private static createRepository(): PostProductRepository {
        return new PostProductRepository(PostProductFactory.createDataSource(), new ProductToPostMapper());
    }
    private static createDataSource(): MySQLEndpointPost{
        return new MySQLEndpointPost(PostProductFactory.createConnector());
    }
    private static createConnector(): MySQLConnector{
        return MySQLConnector.getInstance();
    } 
}