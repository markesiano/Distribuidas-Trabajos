"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const TypeDefs_1 = __importDefault(require("./src/Infraestructure/Apollo/graphql/TypeDefs"));
const Resolvers_1 = __importDefault(require("./src/Infraestructure/Apollo/graphql/Resolvers"));
const MongoDBConexion_1 = __importDefault(require("./src/Infraestructure/Database/Connectors/MongoDBConexion"));
const typeDefs = TypeDefs_1.default;
const resolvers = Resolvers_1.default;
const server = new apollo_server_1.ApolloServer({
    typeDefs,
    resolvers,
});
MongoDBConexion_1.default;
server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
    // Write in console all POST requests from the clients to the server
});
