import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import Product from "./resolvers/Product.js";
import { Category } from "./resolvers/Category.js";
import { Query } from "./resolvers/Query.js";
import { products, categories } from "./db.js";

// Resolvers define how to fetch the types defined in your schema.
const resolvers = { Product, Category, Query };

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    return { products, categories };
  },
});

console.log(`🚀  Server ready at: ${url}`);
