/* eslint-disable semi */
import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AddBlogForm from './AddBlogForm';

describe('AddBlogForm component', () => {
  it('calls the addBlog event handler with the right details when a new blog is created', async () => {
    const mockAddBlog = vi.fn();
    const mockToggleVisibility = vi.fn();

    render(
      <AddBlogForm
        addBlog={mockAddBlog}
        toggleVisibility={mockToggleVisibility}
      />
    );

    // Simulate user typing into the input fields
    const titleInput = screen.getByLabelText('title:');
    const authorInput = screen.getByLabelText('author:');
    const urlInput = screen.getByLabelText('url:');
    await userEvent.type(titleInput, 'Test Blog Title');
    await userEvent.type(authorInput, 'Test Author');
    await userEvent.type(urlInput, 'http://testurl.com');

    // Find and click the submit button
    const submitButton = screen.getByRole('button', {
      name: 'Submit',
    });
    await userEvent.click(submitButton);

    // Check if the mockAddBlog was called once with the correct parameters
    expect(mockAddBlog).toHaveBeenCalledTimes(1);
    expect(mockAddBlog).toHaveBeenCalledWith({
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 0,
    });

    expect(mockToggleVisibility).toHaveBeenCalledTimes(1);
  });
});
