const graphql = require("graphql");
const { GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLID } = graphql;

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
      id: { type: GraphQLNonNull(GraphQLID) },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      age: { type: GraphQLInt }
    },
    resolve(parentValue, args) {
      const updatedAuthor = updateAuthor(args.id, args);
      return updatedAuthor;
    }
  },
  deleteAuthor: {
    name: "delete Author",
    description: "removes author from the system",
    type: AuthorType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve(parentValue, args) {
      const deletedAuthor = deleteAuthor(args.id);
      return deletedAuthor;
    }
  }
};

module.exports = AuthorMutations;
