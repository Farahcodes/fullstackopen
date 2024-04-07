// @ts-nocheck
import { useMutation, useQueryClient } from '@tanstack/react-query';

// requests
import { createAnecdote } from '../../requests';
// Notification reducer
import { useNotification } from '../NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useNotification();

  const mutation = useMutation({
    mutationFn: createAnecdote,
    onMutate: async (newAnecdote) => {
      await queryClient.cancelQueries(['anecdotes']);
      const previousAnecdotes = queryClient.getQueryData([
        'anecdotes',
      ]);
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) => [
        ...oldAnecdotes,
        newAnecdote,
      ]);
      return { previousAnecdotes };
    },
    onError: (err, newAnecdote, context) => {
      queryClient.setQueryData(
        ['anecdotes'],
        context.previousAnecdotes
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['anecdotes']);
      // dispatch notification after successful creation
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: 'Anecdote created successfully!',
        notificationType: 'success',
      });
      // clearing notification after timeout
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value.trim();

    if (content.length < 5) {
      console.log('Content must be at least 5 characters long.');
      return;
    }

    mutation.mutate({ content, votes: 0 });
    event.target.anecdote.value = '';
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
