import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import configureStore from './redux/store'
import * as serviceWorker from './serviceWorker';

/* 创建store */
const store = configureStore()

const renderApp = () =>
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./App', renderApp)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
