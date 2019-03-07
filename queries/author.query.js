const graphql = require("graphql");
const { GraphQLList } = graphql;

const AuthorType = require("../types/author.type");
const { getAllAuthors } = require('../utils/mock/authors.mock');

const AuthorQueries = {
  authors: {
    name: 'Authors',
    description: 'returns all the authors information',
    type: new GraphQLList(AuthorType),
    resolve(){
      const allAuthors = getAllAuthors();
      return allAuthors;
    }
  }
};

module.exports = AuthorQueries;