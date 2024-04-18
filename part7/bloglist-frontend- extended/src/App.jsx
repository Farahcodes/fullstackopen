/* eslint-disable semi */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// components
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import BlogList from './components/BlogList';
// services
import blogService from './services/blogs';
import loginService from './services/login';
// utils
import handleError from './utils/handleError';
// actions
import { showNotification } from './reducers/notificationReducer';
import { fetchBlogs } from './reducers/blogReducer';

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  // fetching blogs
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedBlogAppUser'
    );

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject);

      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);

      dispatch(
        showNotification({ message: 'Logged in', type: 'success' })
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: `Login unsuccessful: ${handleError(error)}`,
          type: 'failure',
        })
      );
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);

    dispatch(
      showNotification({ message: 'Logged out', type: 'success' })
    );
  };

  if (!user) {
    return (
      <>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </>
    );
  }

  if (isError) return <div>Error: Could not load blogs</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Notification />
      <UserInfo user={user} handleLogout={handleLogout} />
      <BlogList user={user} />
    </>
  );
};

export default App;
