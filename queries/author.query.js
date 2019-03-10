const graphql = require("graphql");
const { GraphQLList, GraphQLID } = graphql;

const AuthorType = require("../types/author.type");
const { getAllAuthors, getAuthorById } = require("../utils/mock/authors.mock");

const AuthorQueries = {
  authors: {
    name: "Authors",
    description: "returns all the authors information",
    type: new GraphQLList(AuthorType),
    resolve() {
      const allAuthors = getAllAuthors();
      return allAuthors;
    }
  },
  author: {
    name: "Author",
    description:
      "returns the information about a specific author depending on the author id",
    type: AuthorType,
    args: {
      id: { type: GraphQLID }
    },
    resolve(parentValue, args) {
      const author = getAuthorById(args.id);
      if (!author) throw new Error("could not find author");
      return author;
    }
  }
};

module.exports = AuthorQueries;
