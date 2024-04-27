// @ts-nocheck
/* eslint-disable semi */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// actions
import { logout } from '../reducers/userReducer';

const UserInfo = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const user = useSelector((state) => state.user);

  return (
    <Card>
      <CardContent>
        <Typography variant="body1">
          {user.name} is logged in
        </Typography>
        <Button variant="contained" onClick={handleLogout}>
          Log out
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
