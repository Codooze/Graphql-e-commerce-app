import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { db } from "./db.js";
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  
  type Product { 
    id: ID!
    name: String!
    description: String!
    quatity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
    category: Category
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. 
  type Query {
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }
`;
// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
  Query: {
    products: () => db.products,
    product: (parent, { id }) =>
      db.products.find((product) => product.id === id),
    categories: () => db.categories,
    category: (parent, { id }) =>
      db.categories.find((category) => category.id === id),
  },
  Category: {
    // parent is the category
    products: (parent) => {
      return db.products.filter((product) => product.categoryId === parent.id);
    },
  },
  Product: {
    // parent is the product
    category: (parent) => {
      return db.categories.find(
        (category) => category.id === parent.categoryId
      );
    },
  },
};

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
});

console.log(`🚀  Server ready at: ${url}`);
