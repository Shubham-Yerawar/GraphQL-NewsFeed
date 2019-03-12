const lodash = require("lodash");

const authors = [
  {
    id: "1",
    firstName: "Jon",
    lastName: "Snow",
    age: 24,
    isDeleted: false
  },
  {
    id: "2",
    firstName: "Samwell",
    lastName: "Tarly",
    age: 22,
    isDeleted: false
  },
  {
    id: "3",
    firstName: "Cersi",
    lastName: "Lannister",
    age: 30,
    isDeleted: false
  }
];

const getNewAuthorId = () => {
  return authors.length + 1;
};

exports.getAllAuthors = () => {
  return authors;
};

exports.getAuthorById = authorId => {
  return authors.filter(anAuthor => anAuthor.id === authorId)[0];
};

exports.addAuthor = author => {
  const authorToAdd = {
    id: getNewAuthorId(),
    ...author,
    isDeleted: false
  };
  authors.push(authorToAdd);
  return authorToAdd;
};

exports.updateAuthor = (id, newValuesForAuthor) => {
  const index = lodash.findIndex(authors, { id: id });
  const oldValues = authors[index];
  const updatedAuthor = {
    ...oldValues,
    ...newValuesForAuthor
  };
  authors.splice(index, 1, updatedAuthor);
  return updatedAuthor;
};

exports.deleteAuthor = id => {
  const index = lodash.findIndex(authors, { id: id });
  const author = authors[index];
  const updatedAuthor = {
    ...author,
    isDeleted: true
  };
  authors.splice(index, 1, updatedAuthor);
  return author;
};
