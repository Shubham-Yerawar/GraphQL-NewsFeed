// schema related dependencies
const graphql = require("graphql");
const { GraphQLSchema } = graphql;

const RootQuery = require("../queries");
const Mutations = require("../mutations");

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});

module.exports = schema;
