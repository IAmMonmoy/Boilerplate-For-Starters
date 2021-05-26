import { getBooks, getBook } from './data';

const resolvers = {
  Query: {
    books: (parent, { }) => {
      return getBooks()
        .then(function (result) {
          return result;
        })
        .catch(function (err) {
          throw new Error(err.message);
        });
    },
    book: (parent, { id }) => {
      return getBook(id)
        .then(function (result) {
          return result;
        })
        .catch(function (err) {
          throw new Error(err.message);
        });
    }
  }
};

module.exports = { resolvers }