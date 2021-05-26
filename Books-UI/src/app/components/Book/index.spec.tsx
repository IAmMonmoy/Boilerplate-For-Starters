import * as React from 'react';
import { render } from '@testing-library/react';
import Book from './index';

describe('<Book/>', () => {
  it('should match the snapshot', () => {
    const book = render(
      <Book id="id" title="title" year="year" details="details" />,
    );
    expect(book.container.firstChild).toMatchSnapshot();
  });
});
