import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import bookPage, {
  BookPageState,
} from '../../pages/BooksPage/books-page.reducer';

import bookDeatilPage, {
  BookDeatilPageState,
} from '../../pages/BookDetailPage/book-detail.reducer';

export interface IRootState {
  readonly bookPage: BookPageState;
  readonly bookDeatilPage: BookDeatilPageState;
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  bookPage,
  bookDeatilPage,
  loadingBar,
});

export default rootReducer;
