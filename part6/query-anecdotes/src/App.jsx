// @ts-nocheck
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

// components
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
// requests
import { getAnecdotes, updateAnecdote } from '../requests';
// Notification reducer
import { useNotification } from './NotificationContext';
const App = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useNotification();

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
      // dispatch notification after successful vote
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: 'Anecdote voted successfully!',
        notificationType: 'success',
      });
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      id: anecdote.id,
      updatedAnecdote: {
        ...anecdote,
        votes: anecdote.votes + 1,
      },
    });
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
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
