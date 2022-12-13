require("dotenv").config();

const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');

const connectDatabase = require('./src/database/connect');
const populateDatabase = require('./src/database/populate');

const resolvers = require('./src/graphql/resolvers');
const typeDefs = gql(
  fs.readFileSync('./src/graphql/typeDefs.graphql', { encoding: 'utf-8' }),
);

connectDatabase().then(() => {
  console.log('connected to db...');
  populateDatabase();
});

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(5000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
