// @ts-nocheck
/* eslint-disable semi */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import { login } from '../reducers/userReducer';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { username, password };

    dispatch(login(user));
  };

  return (
    <div>
      <h1>Log in to Application</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username:</label>
          <input
            type="text"
            value={username}
            name="username-input"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password:</label>
          <input
            type="password"
            value={password}
            name="password-input"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
