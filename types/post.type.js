const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;

// FIXME: i dont know why it didnot work ??
const AuthorType = require("./author.type.js");

const { getAuthorById } = require("../utils/mock/authors.mock");

const PostType = new GraphQLObjectType({
  name: "PostType",
  description: "Defines the post instance properties",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    viewCount: { type: GraphQLInt },
    likesCount: { type: GraphQLInt },
    numberOfAuthors: {
      type: GraphQLInt,
      description: " this is a derived field ",
      resolve(parentValue) {
        const allAuthors = [];
        parentValue.authors.forEach(anAuthorId => {
          const author = getAuthorById(anAuthorId);
          allAuthors.push(author);
        });
        return allAuthors.length;
      }
    },
    authors: {
      type: new GraphQLList(require("./author.type.js")), // ASK: should it be done like this
      resolve(parentValue) {
        const allAuthors = [];
        parentValue.authors.forEach(anAuthorId => {
          const author = getAuthorById(anAuthorId);
          allAuthors.push(author);
        });
        return allAuthors;
      }
    }
  })
});

module.exports = PostType;
