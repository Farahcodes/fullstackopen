/* eslint-disable semi */
// @ts-nocheck
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import BlogList from './components/BlogList';

// actions
import { fetchBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';

const App = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // fetching blogs
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // set user from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedBlogAppUser'
    );

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, []);

  if (!user) {
    return (
      <>
        <Notification />
        <LoginForm />
      </>
    );
  }

  return (
    <>
      <Notification />
      <UserInfo />
      <BlogList />
    </>
  );
};

export default App;
