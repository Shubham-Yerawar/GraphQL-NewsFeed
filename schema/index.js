// schema related dependencies
const graphql = require("graphql");
const { GraphQLSchema } = graphql;

const RootQuery = require("../queries");

const schema = new GraphQLSchema({
  query: RootQuery
});

module.exports = schema;
