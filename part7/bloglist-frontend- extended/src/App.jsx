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
import BlogDetail from './components/BlogDetail';
import UsersList from './components/UsersList';
import UserDetail from './components/UserDetail';
import ProtectedRoute from './components/ProtectedRoute';

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
    <div>
      <Notification />
      <nav>
        <Link to="/">Home</Link> | <Link to="/blogs">Blogs</Link> |{' '}
        <Link to="/users">Users</Link>
      </nav>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <LoginForm />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <UserInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <BlogList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:userId"
          element={
            <ProtectedRoute>
              <UserDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/:blogId"
          element={
            <ProtectedRoute>
              <BlogDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
