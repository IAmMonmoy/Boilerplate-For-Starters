import {
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../../shared/reducers/action-type.util';
import axios from 'axios';

export const ACTIONS_TYPES = {
  FETCH_BOOKS: 'bookPage/FETCH_BOOKS',
};

export interface IBookPageBook {
  bookId: string;
  title: string;
  year: string;
}

const initialState = {
  loading: false,
  errorMessage: null,
  books: [] as ReadonlyArray<IBookPageBook>,
};

const apiUrl = 'books';

export type BookPageState = Readonly<typeof initialState>;

const reducer = (
  state: BookPageState = initialState,
  action,
): BookPageState => {
  switch (action.type) {
    case REQUEST(ACTIONS_TYPES.FETCH_BOOKS):
      return {
        ...state,
        loading: true,
      };
    case SUCCESS(ACTIONS_TYPES.FETCH_BOOKS):
      return {
        ...state,
        loading: false,
        books: action.payload,
      };
    case FAILURE(ACTIONS_TYPES.FETCH_BOOKS):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getBooks = () => {
  const requestUrl = apiUrl;
  return {
    type: ACTIONS_TYPES.FETCH_BOOKS,
    payload: axios.get(requestUrl),
  };
};

export default reducer;
