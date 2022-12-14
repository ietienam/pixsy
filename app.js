require('dotenv').config();
const fs = require('fs');

const { ApolloServer, gql } = require('apollo-server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { rateLimitDirective } = require('graphql-rate-limit-directive');
const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } =
  rateLimitDirective();
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');

const resolvers = require('./src/graphql/resolvers');
const typeDefs = gql(
  fs.readFileSync('./src/graphql/typeDefs.graphql', { encoding: 'utf-8' }),
);

let schema = makeExecutableSchema({
  typeDefs: [rateLimitDirectiveTypeDefs, typeDefs],
  resolvers,
});

schema = rateLimitDirectiveTransformer(schema);

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

module.exports = server;