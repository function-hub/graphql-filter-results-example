const { ApolloServer, gql } = require("apollo-server");
const pickoutFieldWithInfo = require("graphql-filter-results");
const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: (root, args, context, info) => {
        const fields = pickoutFieldWithInfo(info);
        // currently, i will not set up db in example
        const books = await BookModel.findAll({
            where: {
                bookId: args.bookId
            },
            attributes: fields
        })
        return books;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
