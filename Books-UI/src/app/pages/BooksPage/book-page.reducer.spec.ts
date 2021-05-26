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
import bookPage, { ACTIONS_TYPES, getBooks } from './books-page.reducer';

describe('Book page reducer tests', () => {
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
    expect(isEmpty(state.books));
  }

  function testMultipleTypes(types, payload, testFunction) {
    types.forEach(e => {
      testFunction(bookPage(undefined, { type: e, payload }));
    });
  }

  describe('Common', () => {
    it('should return the initial state', () => {
      testInitialState(bookPage(undefined, {}));
    });
  });

  describe('Requests', () => {
    it('should set state to loading', () => {
      testMultipleTypes([REQUEST(ACTIONS_TYPES.FETCH_BOOKS)], {}, state => {
        expect(state).toMatchObject({
          errorMessage: null,
          loading: true,
        });
      });
    });
    it('should set state to loading complete', () => {
      testMultipleTypes([REQUEST(ACTIONS_TYPES.FETCH_BOOKS)], {}, state => {
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
        [FAILURE(ACTIONS_TYPES.FETCH_BOOKS)],
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
      const payload = [{ data: 'some data' }];
      const toTest = bookPage(undefined, {
        type: SUCCESS(ACTIONS_TYPES.FETCH_BOOKS),
        payload,
      });
      expect(toTest).toMatchObject({
        loading: false,
        books: payload,
      });
    });
  });

  describe('Actions', () => {
    let store;
    const resolvedObject = [{ value: 'whatever' }];
    beforeEach(() => {
      const mockStore = configureStore([thunk, promiseMiddleware]);
      store = mockStore({});
      axios.get = sinon.stub().returns(Promise.resolve(resolvedObject));
    });
    it('dispatches FETCH_BOOKS_PENDING and FETCH_BOOKSS_FULFILLED actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTIONS_TYPES.FETCH_BOOKS),
        },
        {
          type: SUCCESS(ACTIONS_TYPES.FETCH_BOOKS),
          payload: resolvedObject,
        },
      ];
      await store
        .dispatch(getBooks())
        .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
  });
});
