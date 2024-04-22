/* eslint-disable semi */
// @ts-nocheck
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

// Components
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import BlogList from './components/BlogList';
import UsersList from './components/UsersList';

// Actions
import { fetchBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
    const loggedUserJSON = window.localStorage.getItem(
      'loggedBlogAppUser'
    );
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Notification />
        <nav>
          <Link to="/">Home</Link> | <Link to="/blogs">Blogs</Link> |{' '}
          <Link to="/users">Users</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={user ? <UserInfo /> : <LoginForm />}
          />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
