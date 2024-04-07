// @ts-nocheck
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// components
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

const fetchAnecdotesList = async () => {
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

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote');
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: fetchAnecdotesList,
  });

  if (isPending) {
    return <div>Loading data...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
