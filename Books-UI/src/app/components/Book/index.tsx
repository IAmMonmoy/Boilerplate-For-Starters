import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// @ts-ignore
import GenricBookImage from './assets/book.jpeg';
import styled from 'styled-components/macro';

interface BookProps {
  id: string;
  title: string;
  year: string;
  details?: string;
  size?: string;
  onClick?: (id: string) => any;
}

const Book = ({
  id,
  title,
  year,
  details,
  size = 'sm',
  onClick,
}: BookProps) => {
  return (
    <Wrapper width={size}>
      <Card>
        <Card.Img variant="top" src={GenricBookImage} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>{year}</Card.Subtitle>
          {details && (
            <Card.Text className="book--description">{details}</Card.Text>
          )}
          {onClick && (
            <ButtonWrapper>
              <Button onClick={() => onClick(id)} variant="primary">
                Details
              </Button>
            </ButtonWrapper>
          )}
        </Card.Body>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ width: string }>`
  margin: 5px;
  width: ${props => (props.width === 'sm' ? '18em' : '50em')};
  display: table;
  margin: 0 auto;
`;

const ButtonWrapper = styled.div`
  margin: 2px;
`;
export default Book;
