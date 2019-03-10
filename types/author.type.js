const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLDeprecatedDirective
} = graphql;

const PostType = require("./post.type.js");
const { getAllPostsByAuthor } = require("../utils/mock/posts.mock");

const AuthorType = new GraphQLObjectType({
  name: "AuthorType",
  description: "Defines the author properties",
  fields: () => ({
    id: { type: GraphQLID },
    name: {
      type: GraphQLString,
      deprecationReason: "name is now subdivided into firstName and lastName",
      resolve(parentValue) {
        return `${parentValue.firstName} ${parentValue.lastName}`;
      }
    },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: {
      type: GraphQLInt,
      args: {
        unit: { 
          type: GraphQLString,
          defaultValue: "YEARS"
        }
      },
      resolve(parentValue,args) {
        const { age } = parentValue;
        const { unit } = args;

        switch (unit) {
          case "DAYS": {
            return age * 365;
          }

          case "MONTHS":{
            return age * 12;
          }

          default: {
            return age;
          }
        }
      }
    },
    posts: {
      type: new GraphQLList(require("./post.type.js")),
      resolve(parentValue) {
        const allPosts = getAllPostsByAuthor(parentValue.id);
        return allPosts;
      }
    }
  })
});

module.exports = AuthorType;
