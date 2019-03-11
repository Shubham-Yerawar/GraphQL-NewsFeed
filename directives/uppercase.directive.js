const { GraphQLCustomDirective } = require("./custom.directive");

var GraphQLUppercaseDirective = GraphQLCustomDirective({
  name: "uppercase",
  description: `transforms your string to uppercase. should only be used with string type`,
  locations: ["FIELD"],
  resolve(resolve, source, args) {
    return resolve().then(input => {
      const stringToReturn = `${input}`;
      return stringToReturn.toUpperCase();
    });
  }
});

exports.GraphQLUppercaseDirective = GraphQLUppercaseDirective;
