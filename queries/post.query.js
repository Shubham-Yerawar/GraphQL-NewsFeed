const graphql = require("graphql");
const { GraphQLList } = graphql;

const PostType = require("../types/post.type");
const { getAllPosts } = require('../utils/mock/posts.mock');

const PostQueries = {
  posts: {
    name: 'Posts',
    description: 'returns all the posts information',
    type: new GraphQLList(PostType),
    resolve(){
      const allPosts = getAllPosts();
      return allPosts;
    }
  }
};

module.exports = PostQueries;