import { gql } from 'apollo-server';
export class TypeDefs {
    public static typeDefs = gql`
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

    constructor(){


    }
}
export default TypeDefs.typeDefs;