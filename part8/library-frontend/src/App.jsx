// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// components
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('user-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('user-token');
    if (token) {
      setToken(token);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem('user-token');
    setPage('authors');
  };

  return (
    <ApolloProvider client={client}>
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          {token ? (
            <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={logout}>logout</button>
            </>
          ) : (
            <button onClick={() => setPage('login')}>login</button>
          )}
        </div>

        <Authors show={page === 'authors'} />
        <Books show={page === 'books'} />
        <NewBook show={page === 'add'} />
        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setPage={setPage}
        />
      </div>
    </ApolloProvider>
  );
};

export default App;
