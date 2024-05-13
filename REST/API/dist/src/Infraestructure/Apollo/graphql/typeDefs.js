"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeDefs = void 0;
const apollo_server_1 = require("apollo-server");
class TypeDefs {
    constructor() {
    }
}
exports.TypeDefs = TypeDefs;
TypeDefs.typeDefs = (0, apollo_server_1.gql) `
    type Product {
        id: ID
        name: String
        description: String
        price: Float
        stock: Int
        status: String
    }

    input ProductInput {
        name: String
        description: String
        price: Float
        stock: Int
    }

    input EditRecipeInput {
        name: String
    }
    type Query {
        getProducts: [Product]
        getProduct(id: ID!): Product
    }


    type Mutation {
        createProduct(input: ProductInput): Product!
        deleteProduct(ID: ID!): Boolean
        updateProduct(ID: ID!, input: ProductInput): Boolean

    }


`;
exports.default = TypeDefs.typeDefs;
