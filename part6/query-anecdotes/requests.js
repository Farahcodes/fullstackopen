import axios from 'axios';

export const getAnecdotes = async () => {
  try {
    const response = await axios.get(
      'http://localhost:3001/anecdotes'
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        'An error occurred while fetching the data.'
    );
  }
};
