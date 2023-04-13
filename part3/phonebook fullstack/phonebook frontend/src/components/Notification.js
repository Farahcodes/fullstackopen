import React from "react";
const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  const notificationClass = type === "error" ? "error" : "success";

  return <div className={notificationClass}>{message}</div>;
};

export default Notification;
