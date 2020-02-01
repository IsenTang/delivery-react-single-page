import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

/* 自定义reducers */

/* global */
import loading from './reducers/loading';
import error from './reducers/error';
import alert from './reducers/alert';
import language from './reducers/language';
import cart from './reducers/cart';

/* pages */
import login from '../Views/Login/state/reducers';
import restaurant from '../Views/Restaurant/state/reducers';
import menu from '../Views/Menu/state/reducers';
import order from '../Views/Order/state/reducers';

const rootReducer = (history) => combineReducers({
   router: connectRouter(history),
   loading,
   error,
   alert,
   language,
   login,
   restaurant,
   menu,
   cart,
   order
});

export default rootReducer;