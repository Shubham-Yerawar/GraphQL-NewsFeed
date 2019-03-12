const graphql = require("graphql");
const { GraphQLObjectType } = graphql;

const AuthorMutations = require("./author.mutation");
const PostMutations = require("./post.mutation");

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "it allows us to add/mod/delete data",
  fields: () => ({
    ...AuthorMutations,
    ...PostMutations
  })
});

module.exports = Mutation;
