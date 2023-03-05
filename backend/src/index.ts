import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv'
import dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';

dotenv.config()

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];


dynamoose.aws.ddb.local("http://ddb:8000");

class BookClass extends Item {
  id!: string
  title!: string
  author!: string
}

const BookModel = dynamoose.model<BookClass>("Book", {"id": String, "title": String, "author": String});
const BookTable =  new dynamoose.Table("Book", [BookModel], { throughput: 'ON_DEMAND', create: true, waitForActive: true });

BookModel.create({id: '1', title: 'a good book', author: 'John'}, {overwrite: true})

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: async () => {
          return await BookModel.scan().exec()
        },
    },
};


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
export const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// // Passing an ApolloServer instance to the `startStandaloneServer` function:
// //  1. creates an Express app
// //  2. installs your ApolloServer instance as middleware
// //  3. prepares your app to handle incoming requests
// const { url } = await startStandaloneServer(server, {
//     listen: { port: 4000 },
// });

// console.log(`🚀  Server ready at: ${url}`);