"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostProductFactory = void 0;
const MySQLConnector_1 = require("../../Infraestructure/Database/MySQLConnector");
const PostProduct_1 = require("../../Domain/UseCases/PostProduct");
const PostProductController_1 = require("../PostProductController");
const PostProductRepository_1 = require("../../Data/Repositories/PostProductRepository");
const ProductToPostMapper_1 = require("../../Data/Repositories/Mappers/ProductToPostMapper");
const MySQLEndpointPost_1 = require("../../Data/Database/MySQLEndpointPost");
class PostProductFactory {
    static create() {
        return new PostProductController_1.PostProductController(PostProductFactory.createUseCase());
    }
    static createUseCase() {
        return new PostProduct_1.PostProduct(PostProductFactory.createRepository());
    }
    static createRepository() {
        return new PostProductRepository_1.PostProductRepository(PostProductFactory.createDataSource(), new ProductToPostMapper_1.ProductToPostMapper());
    }
    static createDataSource() {
        return new MySQLEndpointPost_1.MySQLEndpointPost(PostProductFactory.createConnector());
    }
    static createConnector() {
        return MySQLConnector_1.MySQLConnector.getInstance();
    }
}
exports.PostProductFactory = PostProductFactory;
