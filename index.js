const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("./schema");

// create an instance of express
const app = express();

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);

app.listen(4001, () => {
  console.log("listening at 4001");
});
