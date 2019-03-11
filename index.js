const express = require("express");
const expressGraphQL = require("express-graphql");
const depthLimit = require("graphql-depth-limit");
const schema = require("./schema");

// create an instance of express
const app = express();

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
    validationRules: [depthLimit(2)],
    formatError: error => {
      return error;
    }
  })
);

app.listen(4001, () => {
  console.log("listening at 4001");
});
