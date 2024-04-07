/* eslint-disable react/prop-types */
import React from 'react';
import { useNotification } from '../NotificationContext';
const Notification = () => {
  const { state } = useNotification();
  if (!state) return null;

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return <div style={style}>{state.message}</div>;
};

export default Notification;
