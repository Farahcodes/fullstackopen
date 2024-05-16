/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

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

const Books = ({ show }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const { loading, error, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    refetch({ genre });
  };

  if (!show) {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const genres = [
    ...new Set(data.allBooks.flatMap((book) => book.genres)),
  ];

  return (
    <div>
      <h2>books</h2>

      {selectedGenre && (
        <p>
          in genre <strong>{selectedGenre}</strong>
        </p>
      )}

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

      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleGenreClick(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => handleGenreClick(null)}>
          all genres
        </button>
      </div>
    </div>
  );
};

export default Books;
