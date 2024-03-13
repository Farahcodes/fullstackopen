/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable semi */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('Blog component', () => {
  test("renders the blog's title and author, but not the URL or number of likes by default", () => {
    const blog = {
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 3,
      id: 'testid1',
      user: {
        username: 'testuser',
        name: 'Test User',
        id: 'userid1',
      },
    };

    const user = {
      name: 'Test User',
      username: 'testuser',
      token: 'testtoken',
    };

    render(
      <Blog
        blog={blog}
        updateBlog={() => {}}
        removeBlog={() => {}}
        user={user}
      />
    );

    const titleAuthor = screen.getByText(
      'Test Blog Title by Test Author'
    );
    expect(titleAuthor).toBeInTheDocument();

    const url = screen.queryByText('http://testurl.com');
    expect(url).not.toBeInTheDocument();

    const likes = screen.queryByText('Likes:', { exact: false });
    expect(likes).not.toBeInTheDocument();
  });

  test("shows the blog's URL and number of likes when the details button is clicked", async () => {
    const blog = {
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 3,
      id: 'testid1',
      user: {
        username: 'testuser',
        name: 'Test User',
        id: 'userid1',
      },
    };

    const user = {
      name: 'Test User',
      username: 'testuser',
      token: 'testtoken',
    };

    render(
      <Blog
        blog={blog}
        updateBlog={() => {}}
        removeBlog={() => {}}
        user={user}
      />
    );

    // Find the button that toggles the expansion of the details and simulate clicking it
    const button = screen.getByRole('button', {
      name: 'Show Details',
    });
    await userEvent.click(button);

    // After clicking, the URL and the number of likes should be visible
    expect(
      screen.getByText('http://testurl.com')
    ).toBeInTheDocument();
    expect(screen.getByText('Likes: 3')).toBeInTheDocument();
  });
});
