const graphql = require("graphql");
const { GraphQLList, GraphQLID, GraphQLInt } = graphql;

const PostType = require("../types/post.type");
const { getAllPosts, getPostById } = require("../utils/mock/posts.mock");

const PostQueries = {
  posts: {
    name: "Posts",
    description: "returns all the posts information",
    type: new GraphQLList(PostType),
    args:{
      limit: { 
        type : GraphQLInt,
        defaultValue: 2,
        description: "number of posts to be fetched in a request"
      },
      offset:{
        type: GraphQLInt,
        defaultValue: 0,
        description: "number of posts to skip"
      }
    },
    resolve(parentValue, args) {
      const { limit, offset } = args;
      const allPosts = getAllPosts(limit, offset);
      return allPosts;
    }
  },
  post: {
    name: "Post",
    description:
      "returns the information about a specific post depending on post id",
    type: PostType,
    args: {
      id: { type: GraphQLID }
    },
    resolve(parentValue, args) {
      const post = getPostById(args.id);
      return post;
    }
  }
};

module.exports = PostQueries;
