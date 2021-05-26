import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import reducer, { IRootState } from '../app/shared/reducers';
import DevTools from './devtools';
import notificationMiddleware from './notification-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
const defaultMiddlewares = [
  thunkMiddleware,
  notificationMiddleware,
  promiseMiddleware,
  loadingBarMiddleware(),
];
const composedMiddlewares = middlewares =>
  process.env.NODE_ENV === 'development'
    ? compose(
        applyMiddleware(...defaultMiddlewares, ...middlewares),
        DevTools.instrument(),
      )
    : compose(applyMiddleware(...defaultMiddlewares, ...middlewares));
const initialize = (initialState?: IRootState, middlewares = []) =>
  createStore(reducer, initialState, composedMiddlewares(middlewares));
export default initialize;
