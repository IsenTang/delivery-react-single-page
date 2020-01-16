import loading from './reducers/loading';
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

const rootReducer = (history) => combineReducers({
   router: connectRouter(history),
   loading
});
  
export default rootReducer;