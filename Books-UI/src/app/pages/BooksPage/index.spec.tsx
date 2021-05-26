import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import BooksPage from './index';
import { Provider } from 'react-redux';
const shallowRenderer = createRenderer();

let [getBooks] = new Array(1).fill(jest.fn());

export const testableComponent = component => {
  const mockStore = configureStore([thunk, promiseMiddleware]);
  const store = mockStore({});
  return <Provider store={store}>{component}</Provider>;
};

describe('<BookDeatilPage/>', () => {
  it('should match the snapshot', () => {
    const component = testableComponent(<BooksPage {...shallowSetup()} />);
    const renderedOutput = shallowRenderer.render(component);
    expect(renderedOutput).toMatchSnapshot();
  });
});

function shallowSetup() {
  // Sample props to pass to our shallow render
  const props = {
    books: [
      {
        bookId: '32e959aa-bb2d-11eb-8529-0242ac130003',
        title: 'The Door in the Wall',
        year: 1989,
      },
      {
        bookId: '378bd73a-bb2d-11eb-8529-0242ac130003',
        title: 'Amos Fortune, Free Man',
        year: 1950,
      },
      {
        bookId: '3d634b02-bb2d-11eb-8529-0242ac130003',
        title: 'The Hobbit, Or, There and Back Again',
        year: 2012,
      },
      {
        bookId: '4d634b02-bb2d-11eb-8529-0242ac130003',
        title: 'The Hobbit, Or, There and Back Again',
        year: 1989,
      },
      {
        bookId: '5d634b02-bb2d-11eb-8529-0242ac130003',
        title: 'The Hobbit, Or, There and Back Again',
        year: 1989,
      },
    ],
    match: {} as any,
    done: false,
    getBooks: getBooks,
    loading: false,
    history: {} as any,
    location: {} as any,
  };
  return props;
}
