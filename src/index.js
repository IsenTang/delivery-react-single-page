import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import './index.scss';
import App from './App';
import configureStore from './Redux/store';
import * as serviceWorker from './serviceWorker';
import { history } from './Redux/store';

/* 创建store */
const store = configureStore();

const renderApp = () =>
   render(
      <Provider store={store}>
         <ConnectedRouter history={history}>
            <App />
         </ConnectedRouter>
      </Provider>,
      document.getElementById('root')
   );

if (process.env.NODE_ENV !== 'production' && module.hot) {
   module.hot.accept('./App', renderApp);
}

renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
