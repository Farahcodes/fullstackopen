/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const ME = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;

const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

const Recommendations = ({ show }) => {
  const {
    loading: meLoading,
    error: meError,
    data: meData,
  } = useQuery(ME);
  const favoriteGenre = meData?.me?.favoriteGenre;

  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre,
  });

  if (!show) {
    return null;
  }

  if (meLoading || loading) return <p>Loading...</p>;
  if (meError) return <p>Error: {meError.message}</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
