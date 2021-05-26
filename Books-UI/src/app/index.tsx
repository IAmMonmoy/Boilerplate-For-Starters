/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';

import BookPage from './pages/BooksPage';
import BookDetailPage from './pages/BookDetailPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer
        // position={toast.POSITION.TOP_LEFT}
        // className="toastify-container"
        // toastClassName="toastify-toast"
        />
        <Helmet
          titleTemplate="%s - React Boilerplate"
          defaultTitle="React Boilerplate"
        >
          <meta name="description" content="A React Boilerplate application" />
        </Helmet>

        <Switch>
          <Route
            exact
            path={process.env.PUBLIC_URL + '/'}
            component={BookPage}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + '/bookdetail/:id'}
            component={BookDetailPage}
          />
        </Switch>
        <GlobalStyle />
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
};

export default App;
