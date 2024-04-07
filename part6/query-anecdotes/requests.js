import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        'An error occurred while fetching the data.'
    );
  }
};

export const createAnecdote = async ({ content, votes }) => {
  const response = await axios.post(
    'http://localhost:3001/anecdotes',
    { content, votes }
  );
  return response.data;
};
