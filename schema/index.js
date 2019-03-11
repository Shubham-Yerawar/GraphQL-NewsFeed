// schema related dependencies
const graphql = require("graphql");
const {
  GraphQLSchema,
  GraphQLIncludeDirective,
  GraphQLSkipDirective
} = graphql;
const {
  applySchemaCustomDirectives
} = require("../directives/custom.directive");

const GraphQLUppercaseDirective = require("../directives/uppercase.directive");

const RootQuery = require("../queries");
const Mutations = require("../mutations");

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
  directives: [
    GraphQLUppercaseDirective.GraphQLUppercaseDirective,
    GraphQLIncludeDirective,
    GraphQLSkipDirective
  ]
});

applySchemaCustomDirectives(schema);

module.exports = schema;
