const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;

const { getAllPostsByAuthor } = require("../utils/mock/posts.mock");

const AuthorType = new GraphQLObjectType({
  name: "AuthorType", // name of the type
  description: "Defines the author properties", // optional description about the type
  fields: () => ({
    // properties of the type
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
    posts: {
      type: new GraphQLList(require("./post.type.js")),
      resolve(parentValue) {
        const allPosts = getAllPostsByAuthor(parentValue.id);
        return allPosts;
      }
    }
  })
});

module.exports = AuthorType;
