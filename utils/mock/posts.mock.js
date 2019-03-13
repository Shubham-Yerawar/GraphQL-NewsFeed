const lodash = require("lodash");

const posts = [
  {
    id: "101",
    title: "Winterfell",
    description: "The start of game of thrones",
    viewCount: 10,
    likesCount: 2,
    authors: ["1", "2"]
  },
  {
    id: "102",
    title: "Kings Landing",
    description: "Cersi starts her rage in greed of power",
    viewCount: 50,
    likesCount: 25,
    authors: ["2"]
  },
  {
    id: "103",
    title: "Nights Watch",
    description: "The winter is here",
    viewCount: 20,
    likesCount: 20,
    authors: ["3", "2"]
  }
];

const getNewPostId = () => {
  return posts.length + 101;
};

exports.getAllPosts = (limit, offset) => {
  return posts.slice(offset,offset+limit);
};

exports.getAllPostsByAuthor = (authorId, limit, offset) => {
  console.log("limit -> ", limit, " -> ", offset);
  const allPosts = posts.filter(aPost => aPost.authors.indexOf(authorId) > -1);
  const postsToReturn = allPosts.slice(offset,offset+limit);
  console.log("posts ->", postsToReturn);
  return postsToReturn;
};

exports.getPostById = postId => {
  const post = posts.filter(aPost => aPost.id === postId)[0];
  if (!post) throw new Error("Invalid post id");
  return post;
};

exports.addPost = newPost => {
  const postToAdd = {
    id: getNewPostId(),
    ...newPost,
    viewCount: 0,
    likesCount: 0
  };

  posts.push(postToAdd);
  return postToAdd;
};

exports.updatePost = (id, newValuesForPost) => {
  const index = lodash.findIndex(posts, { id: id });
  if (index === -1) {
    throw new Error("Post now found");
  }
  const oldValues = posts[index];
  const updatedPost = {
    id: id,
    ...oldValues,
    ...newValuesForPost
  };
  posts.splice(index, 1, updatedPost);
  return updatedPost;
};

exports.likePost = id => {
  const index = lodash.findIndex(posts, { id: id });
  if (index === -1) {
    throw new Error("Post now found");
  }
  const oldValues = posts[index];
  const updatedPost = {
    ...oldValues,
    likesCount: oldValues.likesCount + 1
  };
  posts.splice(index, 1, updatedPost);
  return updatedPost;
};
