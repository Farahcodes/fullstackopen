/* eslint-disable no-unused-vars */
// @ts-nocheck
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// store
import store from './store/store';
// components
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
