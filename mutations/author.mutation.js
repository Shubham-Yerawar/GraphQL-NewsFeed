const graphql = require("graphql");
const { GraphQLNonNull, GraphQLString, GraphQLInt } = graphql;

const AuthorType = require("../types/author.type");
const {
  addAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor
} = require("../utils/mock/authors.mock");

const AuthorMutations = {
  addAuthor: {
    name: "addAuthor",
    description: "adds a new author",
    type: AuthorType,
    args: {
      firstName: { type: GraphQLNonNull(GraphQLString) },
      lastName: { type: GraphQLNonNull(GraphQLString) },
      age: { type: GraphQLInt }
    },
    resolve(parentValue, args) {
      const newAuthor = addAuthor(args);
      return newAuthor;
    }
  },
  updateAuthor: {
    name: "updateAuthor",
    description: "updates author",
    type: AuthorType,
    args: {
      id: { type: GraphQLNonNull(GraphQLInt) },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      age: { type: GraphQLInt }
    },
    resolve(parentValue, args) {
      // check if the author exists in system
      const author = getAuthorById(args.id);
      // if (!author)
      //   throw new Error(
      //     "Author with given ID does not exists.. try adding author"
      //   );
      const updatedAuthor = updateAuthor(args.id, args);
      return updatedAuthor;
    }
  },
  deleteAuthor: {
    name: "delete Author",
    description: "removes author from the system",
    type: AuthorType,
    args: {
      id: { type: GraphQLNonNull(GraphQLInt) }
    },
    resolve(parentValue, args) {
      const deletedAuthor = deleteAuthor(args.id);
      return deletedAuthor;
    }
  }
};

module.exports = AuthorMutations;
