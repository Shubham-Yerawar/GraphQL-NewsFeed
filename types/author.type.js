const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;

const PostType = require("./post.type.js");

const AuthorType = new GraphQLObjectType({
  name: "AuthorType",
  description: "Defines the author properties",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parentValue) {
        console.log("parent value [ for post ]", parentValue);
        return "some post";
      }
    }
  })
});

module.exports = AuthorType;
