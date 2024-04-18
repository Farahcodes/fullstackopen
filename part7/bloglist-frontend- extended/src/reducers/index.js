import { combineReducers } from 'redux';

// reducers
import notificationReducer from './notificationReducer';
import blogReducer from './blogReducer';

export default combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
});
