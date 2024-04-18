import { combineReducers } from 'redux';

// reducers
import notificationReducer from './notificationReducer';
import blogReducer from './blogReducer';
import userReducer from './userReducer';

export default combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
});
