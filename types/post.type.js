const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;

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
    authors: {
      type: new GraphQLList(require("./author.type.js")),
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
