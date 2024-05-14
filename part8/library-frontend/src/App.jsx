/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';

// components
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const App = () => {
  const [page, setPage] = useState('authors');

  return (
    <ApolloProvider client={client}>
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
        </div>

        <Authors show={page === 'authors'} />
        <Books show={page === 'books'} />
        <NewBook show={page === 'add'} />
      </div>
    </ApolloProvider>
  );
};

export default App;
