/* eslint-disable semi */
import React from 'react';
import PropTypes from 'prop-types';

// styles
import '../index.css';

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  const className = `notification notification--${notification.type}`;

  return (
    <div id="notification" className={className}>
      {notification.message}
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'failure']).isRequired,
  }),
};

export default Notification;
