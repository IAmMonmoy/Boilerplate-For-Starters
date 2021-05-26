import { gql } from 'apollo-server-express';

const schema = gql`
    type Query {
        books: [Book]
        book(id: String): [Book]
    }

    type Book {
        bookId:	String!
        title: String!
        year: String!
        description: String
    }`;

module.exports = { schema };