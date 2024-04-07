// @ts-nocheck
import { useMutation, useQueryClient } from '@tanstack/react-query';

// requests
import { createAnecdote } from '../../requests';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

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
