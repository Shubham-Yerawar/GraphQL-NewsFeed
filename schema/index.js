// schema related dependencies
const { applySchemaCustomDirectives } = require("graphql-custom-directives");
const {
  GraphQLSchema,
  GraphQLIncludeDirective,
  GraphQLSkipDirective
} = require("graphql");

const Query = require("../queries");
const Mutations = require("../mutations");
const Directives = require("../directives");

const schema = new GraphQLSchema({
  query: Query, // required
  mutation: Mutations, // optional
  // subscription: someSubscriptions, // optional
  directives: [...Directives, GraphQLIncludeDirective, GraphQLSkipDirective] // optional
});

// to make schema aware about the custom directives
applySchemaCustomDirectives(schema);

module.exports = schema;
