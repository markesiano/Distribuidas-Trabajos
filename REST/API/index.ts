import { ApolloServer } from 'apollo-server';

import  TypeDefs  from './src/Infraestructure/Apollo/graphql/TypeDefs';
import  Resolvers  from './src/Infraestructure/Apollo/graphql/Resolvers';
import MongoDBConexion from './src/Infraestructure/Database/Connectors/MongoDBConexion';

const typeDefs = TypeDefs;
const resolvers = Resolvers;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    });
MongoDBConexion
server.listen({port:5000}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);

    // Write in console all POST requests from the clients to the server

});