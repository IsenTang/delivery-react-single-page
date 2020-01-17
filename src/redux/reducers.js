import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

/* 自定义reducers */

/* global */
import loading from './reducers/loading';
import error from './reducers/error';
import alert from './reducers/alert';

/* pages */
import login from '../Views/Login/state/reducers';

const rootReducer = (history) => combineReducers({
   router: connectRouter(history),
   loading,
   error,
   alert,
   login
});

export default rootReducer;