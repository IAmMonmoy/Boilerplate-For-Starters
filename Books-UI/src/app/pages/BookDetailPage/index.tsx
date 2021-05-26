import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Book from '../../components/Book';
import { Container, Row, Col } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import { getBook } from './book-detail.reducer';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';

export interface IBookDetailPageProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<any> {}

export const BookDetailPage = ({
  getBook,
  book,
  match,
}: IBookDetailPageProps) => {
  useEffect(() => {
    getBook(match.params.id);
  }, [getBook, match.params.id]);
  return (
    <Container>
      <Helmet>
        <title>Book Detail Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <Row>
        <Col>
          <Book
            id={book.bookId}
            title={book.title}
            year={book.year}
            details={book.description}
            size="lg"
          />
        </Col>
      </Row>
    </Container>
  );
};

const mapDispatchToProps = { getBook };

const mapStateToProps = (storeState: IRootState) => ({
  loading: storeState.bookDeatilPage.loading,
  book: storeState.bookDeatilPage.book.length
    ? storeState.bookDeatilPage.book[0]
    : { bookId: '', title: '', year: '', description: '' },
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailPage);
