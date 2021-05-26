import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';
import axios from 'axios';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import {
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../../shared/reducers/action-type.util';
import bookDetail, { ACTIONS_TYPES, getBook } from './book-detail.reducer';

describe('Book detail reducer tests', () => {
  function isEmpty(element): boolean {
    if (element instanceof Array) {
      return element.length === 0;
    } else {
      return Object.keys(element).length === 0;
    }
  }

  function testInitialState(state) {
    expect(state).toMatchObject({
      loading: false,
      errorMessage: null,
    });
    expect(isEmpty(state.book));
  }

  function testMultipleTypes(types, payload, testFunction) {
    types.forEach(e => {
      testFunction(bookDetail(undefined, { type: e, payload }));
    });
  }

  describe('Common', () => {
    it('should return the initial state', () => {
      testInitialState(bookDetail(undefined, {}));
    });
  });
  describe('Requests', () => {
    it('should set state to loading', () => {
      testMultipleTypes([REQUEST(ACTIONS_TYPES.FETCH_BOOK)], {}, state => {
        expect(state).toMatchObject({
          errorMessage: null,
          loading: true,
        });
      });
    });
    it('should set state to loading complete', () => {
      testMultipleTypes([REQUEST(ACTIONS_TYPES.FETCH_BOOK)], {}, state => {
        expect(state).toMatchObject({
          errorMessage: null,
          loading: true,
        });
      });
    });
  });
  describe('Failures', () => {
    it('should set state to failed and put an error message in errorMessage', () => {
      testMultipleTypes(
        [FAILURE(ACTIONS_TYPES.FETCH_BOOK)],
        'something happened',
        state => {
          expect(state).toMatchObject({
            loading: false,
            errorMessage: 'something happened',
          });
        },
      );
    });
  });
  describe('Success', () => {
    it('should update state according to a successful fetch book request', () => {
      const payload = { data: 'some data' };
      const toTest = bookDetail(undefined, {
        type: SUCCESS(ACTIONS_TYPES.FETCH_BOOK),
        payload,
      });
      expect(toTest).toMatchObject({
        loading: false,
        book: payload,
      });
    });
  });

  describe('Actions', () => {
    let store;
    const resolvedObject = { value: 'whatever' };
    beforeEach(() => {
      const mockStore = configureStore([thunk, promiseMiddleware]);
      store = mockStore({});
      axios.get = sinon.stub().returns(Promise.resolve(resolvedObject));
    });
    it('dispatches FETCH_BOOK_PENDING and FETCH_BOOKS_FULFILLED actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTIONS_TYPES.FETCH_BOOK),
        },
        {
          type: SUCCESS(ACTIONS_TYPES.FETCH_BOOK),
          payload: resolvedObject,
        },
      ];
      await store
        .dispatch(getBook('12345'))
        .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
  });
});
