import { applyMiddleware, compose, createStore,combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { connectRouter,routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import monitorReducersEnhancer from './enhancers/monitorReducers';
import loggerMiddleware from './middlewares/logger';
import rootReducer from './reducers';

/* 浏览器history */
export const history = createBrowserHistory();

/* 自定义store */
export default function configureStore(preloadedState) {

   /* 中间件 */
   const middlewares = [loggerMiddleware, thunkMiddleware,routerMiddleware];
   const middlewareEnhancer = applyMiddleware(...middlewares);

   /* 插件 */
   const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
   const composedEnhancers = compose(...enhancers);

   /* 创建store */
   const store = createStore(connectRouter(history)(combineReducers({...rootReducer})), preloadedState, composedEnhancers);

   /* 热跟新 */
   if (process.env.NODE_ENV !== 'production' && module.hot) {
      module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
   }
   return store;
}