const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

const AuthorQueries = require("./author.query");
const PostQueries = require("./post.query");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  description: "This is the starting point of the graph traversal",
  fields: {
    hello: {
      name: "hello",
      type: GraphQLString,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return `hello ${args.name}`;
      }
    },
    ...PostQueries,
    ...AuthorQueries,
  }
});

module.exports = RootQuery;
