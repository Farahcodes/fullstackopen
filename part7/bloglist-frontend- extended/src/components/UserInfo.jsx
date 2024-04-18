// @ts-nocheck
/* eslint-disable semi */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

// actions
import { logout } from '../reducers/userReducer';

const UserInfo = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const user = useSelector((state) => state.user);

  <div>
    <span>{user.name} is logged in</span>
    <button type="button" onClick={handleLogout}>
      Log out
    </button>
  </div>;
};

UserInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default UserInfo;
