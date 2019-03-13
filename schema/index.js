// schema related dependencies
const { applySchemaCustomDirectives } = require("graphql-custom-directives");
const {
  GraphQLSchema,
  GraphQLIncludeDirective,
  GraphQLSkipDirective
} = require("graphql");

const RootQuery = require("../queries");
const Mutations = require("../mutations");
const Directives = require("../directives");

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
  directives: [...Directives, GraphQLIncludeDirective, GraphQLSkipDirective]
});

// to make schema aware about the custom directives
applySchemaCustomDirectives(schema);

module.exports = schema;
