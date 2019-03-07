const express = require("express");
const expressGraphQL = require("express-graphql");

// schema related dependencies
const graphql = require("graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = graphql;

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
  }
});

const schema = new GraphQLSchema({
  query: RootQuery
});

// create an instance of express
const app = express();

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);

app.listen(4001, () => {
  console.log("listening at 4001");
});
