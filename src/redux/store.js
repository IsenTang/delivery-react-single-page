import { applyMiddleware, compose, createStore,combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import monitorReducersEnhancer from './enhancers/monitorReducers'
import loggerMiddleware from './middlewares/logger'
import rootReducer from './reducers'

/* 自定义store */
export default function configureStore(preloadedState) {

  /* 中间件 */
  const middlewares = [loggerMiddleware, thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  /* 插件 */
  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composedEnhancers = compose(...enhancers)

  /* 创建store */
  const store = createStore(combineReducers({...rootReducer}), preloadedState, composedEnhancers)

  /* 热跟新 */
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }
  return store
}