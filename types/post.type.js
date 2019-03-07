const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;

const AuthorType = require("./author.type.js");

const PostType = new GraphQLObjectType({
  name: "PostType",
  description: "Defines the post inctance properties",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    viewCount: { type: GraphQLInt },
    likesCount: { type: GraphQLInt },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parentValue) {
        // here I am expecting authorId
        // get author object from author database
        return "some author";
      }
    }
  })
});

module.exports = PostType;
