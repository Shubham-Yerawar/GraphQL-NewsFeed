const graphql = require("graphql");
const { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLID } = graphql;

const PostType = require("../types/post.type");

const { addPost, updatePost, likePost } = require("../utils/mock/posts.mock");
const { getAuthorById } = require("../utils/mock/authors.mock");

const PostMutations = {
  addPost: {
    name: "addPost",
    description: "adds a post",
    type: PostType,
    args: {
      title: { type: GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLNonNull(GraphQLString) },
      authors: { type: GraphQLNonNull(GraphQLList(GraphQLID)) }
    },
    resolve(parentValue, args) {
      const { title, description, authors } = args;

      // just making sure that all the author ids are present in the system
      authors.forEach(authorId => {
        const result = getAuthorById(authorId);
        if (!result) throw new Error("Invalid author specified");
      });

      const addedPost = addPost({ title, description, authors });
      return addedPost;
    }
  },
  updatePost: {
    name: "updatePost",
    description: "can be used to update a specific post",
    type: PostType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      authors: { type: GraphQLList(GraphQLID) }
    },
    resolve(parentValue, args) {
      console.log("args ->", args);
      if (args.authors) {
        // just making sure that all the author ids are present in the system
        args.authors.forEach(authorId => {
          const result = getAuthorById(authorId);
        });
      }
      const newValues = {};
      Object.keys(args).forEach(aKey => {
        if (args[aKey]) {
          newValues[aKey] = args[aKey];
        }
      });
      const updatedPost = updatePost(args.id, newValues);
      return updatedPost;
    }
  },
  likePost: {
    name: "likePost",
    description: "like a post",
    type: PostType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve(parentValue, args) {
      const { id } = args;
      const result = likePost(id);
      return result;
    }
  }
};

module.exports = PostMutations;
