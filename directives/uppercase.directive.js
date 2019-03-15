// const { GraphQLCustomDirective } = require("./custom.directive");

const { GraphQLCustomDirective } = require("graphql-custom-directives");

var GraphQLUppercaseDirective = GraphQLCustomDirective({
  name: "uppercase",
  description: `transforms your string to uppercase. should only be used with string type`,
  locations: ["FIELD"],
  resolve(resolve, parentValue, args) {
    return resolve().then(input => {
      const stringToReturn = `${input}`;
      return stringToReturn.toUpperCase();
    });
  }
});

exports.GraphQLUppercaseDirective = GraphQLUppercaseDirective;
