const graphql = require("graphql");
const { GraphQLList, GraphQLID } = graphql;

const PostType = require("../types/post.type");
const { getAllPosts, getPostById } = require("../utils/mock/posts.mock");

const PostQueries = {
  posts: {
    name: "Posts",
    description: "returns all the posts information",
    type: new GraphQLList(PostType),
    resolve() {
      const allPosts = getAllPosts();
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
      if (!post) throw new Error("Could not find specified post");
      return post;
    }
  }
};

module.exports = PostQueries;
