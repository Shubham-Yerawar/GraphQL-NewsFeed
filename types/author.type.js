const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;

// const PostType = require("./post.type.js");
const { getAllPostsByAuthor } = require('../utils/mock/posts.mock');

const AuthorType = new GraphQLObjectType({
  name: "AuthorType",
  description: "Defines the author properties",
  fields: () => ({
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