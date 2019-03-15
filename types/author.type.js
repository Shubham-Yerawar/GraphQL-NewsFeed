const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;

const PostType = require("./post.type.js");
const { getAllPostsByAuthor } = require("../utils/mock/posts.mock");

const AuthorType = new GraphQLObjectType({
  name: "AuthorType", // name of the type
  description: "Defines the author properties", // description of the type
  fields: () => ({
    // properties or attributes on the type
    id: { type: GraphQLID },
    name: {
      type: GraphQLString,
      deprecationReason: "name is now subdivided into firstName and lastName", // deprecated field
      resolve(parentValue) {
        // but some older clients may still be requesting it so need to resolve it as well
        return `${parentValue.firstName} ${parentValue.lastName}`;
      }
    },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: {
      type: GraphQLInt,
      description: "age can be in DAYS or MONTHS or YEARS (default)",
      args: {
        // accepting field level arguments to tranform the field's value at the server side only
        unit: {
          type: GraphQLString,
          defaultValue: "YEARS"
        }
      },
      resolve(parentValue, args) {
        const { age } = parentValue;
        const { unit } = args;

        switch (unit) {
          case "DAYS": {
            return age * 365;
          }

          case "MONTHS": {
            return age * 12;
          }

          default: {
            return age;
          }
        }
      }
    },
    /**
     *  Author - Post relationship:
     *  we are storing the reference of authors in post.authors
     *  so we can use this relationship here to get all the posts
     *  authored/co-authored by the current author
     */
    posts: {
      type: new GraphQLList(require("./post.type.js")),
      args: {
        limit: {
          type: GraphQLInt,
          defaultValue: 2,
          description: "number of posts to be fetched in a request"
        },
        offset: {
          type: GraphQLInt,
          defaultValue: 0,
          description: "number of records to skip"
        }
      },
      resolve(parentValue, args) {
        const allPosts = getAllPostsByAuthor(
          parentValue.id,
          args.limit,
          args.offset
        );
        return allPosts;
      }
    }
  })
});

module.exports = AuthorType;
