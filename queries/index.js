const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

const AuthorType = require("../types/author.type");

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
    }
    // authors: {
    //   type: new GraphQLList(AuthorType),
    //   resolve() {
    //     // get all the author objects here
    //   }
    // }
  }
});

module.exports = RootQuery;
