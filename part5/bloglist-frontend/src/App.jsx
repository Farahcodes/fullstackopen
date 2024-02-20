// @ts-nocheck
import React, { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import Login from './components/Login';
import Notification from './components/Notification';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const setInitialBlogs = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const blogs = await blogService.getAll();

        setBlogs(blogs);
      } catch (error) {
        console.error(error);
        setIsError(true);
      }

      setIsLoading(false);
    };

    setInitialBlogs();
  }, []);

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
    const message = `Logged out`;
    displayNotification(message, 'success');
  };

  const displayNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  if (!user) {
    return (
      <>
        <Notification notification={notification} />
        <Login
          setUser={setUser}
          displayNotification={displayNotification}
        />
      </>
    );
  }

  if (isError) return <div>Error: Could not load blog list</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Notification notification={notification} />
      <BlogList
        blogs={blogs}
        setBlogs={setBlogs}
        user={user}
        handleLogout={handleLogout}
        displayNotification={displayNotification}
      />
    </>
  );
};

export default App;
