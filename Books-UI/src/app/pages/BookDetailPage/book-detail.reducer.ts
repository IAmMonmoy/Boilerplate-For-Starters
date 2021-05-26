import {
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../../shared/reducers/action-type.util';
import axios from 'axios';

export const ACTIONS_TYPES = {
  FETCH_BOOK: 'bookDetailPage/FETCH_BOOK',
};

export interface IBookDetailPageBook {
  bookId: string;
  title: string;
  year: string;
  description: string;
}

const initialState = {
  loading: false,
  errorMessage: null,
  book: [] as ReadonlyArray<IBookDetailPageBook>,
};

const apiUrl = 'book/';

export type BookDeatilPageState = Readonly<typeof initialState>;

const reducer = (
  state: BookDeatilPageState = initialState,
  action,
): BookDeatilPageState => {
  switch (action.type) {
    case REQUEST(ACTIONS_TYPES.FETCH_BOOK):
      return {
        ...state,
        loading: true,
      };
    case SUCCESS(ACTIONS_TYPES.FETCH_BOOK):
      return {
        ...state,
        loading: false,
        book: action.payload,
      };
    case FAILURE(ACTIONS_TYPES.FETCH_BOOK):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getBook = id => {
  const requestUrl = apiUrl + `?id=${id}`;
  return {
    type: ACTIONS_TYPES.FETCH_BOOK,
    payload: axios.get(requestUrl),
  };
};

export default reducer;
