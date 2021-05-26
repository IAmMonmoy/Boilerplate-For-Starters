import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import BookDetailPage from './index';
import { Provider } from 'react-redux';
const shallowRenderer = createRenderer();

let [getBook] = new Array(1).fill(jest.fn());
export const testableComponent = component => {
  const mockStore = configureStore([thunk, promiseMiddleware]);
  const store = mockStore({});
  return <Provider store={store}>{component}</Provider>;
};

describe('<BookDeatilPage/>', () => {
  it('should match the snapshot', () => {
    const component = testableComponent(<BookDetailPage {...shallowSetup()} />);
    const renderedOutput = shallowRenderer.render(component);
    expect(renderedOutput).toMatchSnapshot();
  });
});

function shallowSetup() {
  // Sample props to pass to our shallow render
  const props = {
    book: { bookId: '', title: '', year: '', description: '' },
    match: {
      params: { id: '7ae5bfa3-f0d4-4fd3-8a9b-61676d67a3c8' },
    } as any,
    done: false,
    getBook: getBook,
    loading: false,
    history: {} as any,
    location: {} as any,
  };
  return props;
}
