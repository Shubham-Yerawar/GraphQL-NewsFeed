const lodash = require("lodash");

const posts = [
  {
    id: "101",
    title: "Winterfell",
    description: "The start of game of thrones",
    viewCount: 10,
    likesCount: 2,
    authors: [1, 2]
  },
  {
    id: "102",
    title: "Kings Landing",
    description: "Cersi starts her rage in greed of power",
    viewCount: 50,
    likesCount: 25,
    authors: [2]
  },
  {
    id: "103",
    title: "Nights Watch",
    description: "The winter is here",
    viewCount: 20,
    likesCount: 20,
    authors: [3, 2]
  }
];

const getNewPostId = () => {
  return posts.length + 101;
};

exports.getAllPosts = () => {
  return posts;
};

exports.getAllPostsByAuthor = authorId => {
  return posts.filter(aPost => aPost.authors.indexOf(authorId) > -1);
};

exports.getPostById = postId => {
  return posts.filter(aPost => aPost.id === postId)[0];
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
  console.log("new index", index);
  const oldValues = posts[index];
  const updatedPost = {
    id: id,
    ...oldValues,
    ...newValuesForPost
  };
  console.log("new values", oldValues);
  console.log("new values", updatedPost);
  posts.splice(index, 1, updatedPost);
  console.log("all posts ->", posts);
  return updatedPost;
};
