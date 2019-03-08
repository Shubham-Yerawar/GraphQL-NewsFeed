const authors = [
  {
    id: 1,
    firstName: "Jon",
    lastName: "Snow",
    age: 24
  },
  {
    id: 2,
    firstName: "Samwell",
    lastName: "Tarly",
    age: 22
  },
  {
    id: 3,
    firstName: "Cersi",
    lastName: "Lannister",
    age: 30
  }
];

exports.getAllAuthors = () => {
  return authors;
};

exports.getAuthorById = authorId => {
  return authors.filter(anAuthor => anAuthor.id === parseInt(authorId))[0];
};
