import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Book from '../../components/Book';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { getBooks } from './books-page.reducer';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
export interface IBookPageProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<any> {}

export const BookPage = ({ getBooks, books }: IBookPageProps) => {
  const history = useHistory();

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <Container>
      <Helmet>
        <title>Book Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <Row>
        {books &&
          books.map(value => {
            return (
              <Col key={value.bookId}>
                <Book
                  id={value.bookId}
                  title={value.title}
                  year={value.year}
                  onClick={id => {
                    const to = `bookdetail/${id}`;
                    history.push(to);
                  }}
                />
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  loading: storeState.bookPage.loading,
  books: storeState.bookPage.books,
});

const mapDispatchToProps = { getBooks };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
