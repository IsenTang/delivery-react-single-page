import { applyMiddleware,createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';

import { createBrowserHistory } from 'history';
import monitorReducersEnhancer from './enhancers/monitorReducers';
import loggerMiddleware from './middlewares/logger';
import rootReducer from './reducers';

/* 浏览器history */
export const history = createBrowserHistory();

/* 自定义store */
export default function configureStore(preloadedState) {

   /* 中间件 */
   const middlewares = [loggerMiddleware,thunk,routerMiddleware(history)];
   const middlewareEnhancer = applyMiddleware(...middlewares);

   /* 插件 */
   const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
   const composedEnhancers = composeWithDevTools(...enhancers);

   /* 创建store */
   const store = createStore(rootReducer(history), preloadedState, composedEnhancers);

   /* 热跟新 */
   if (process.env.NODE_ENV !== 'production' && module.hot) {
      module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
   }
   return store;
}