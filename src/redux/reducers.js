import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

/* 自定义reducers */
import loading from './reducers/loading';
import error from './reducers/error';

const rootReducer = (history) => combineReducers({
   router: connectRouter(history),
   loading,
   error
});
  
export default rootReducer;