import _ from 'lodash';
import * as ActionType from '../actionTypes';

const initialState = { 
   showError: false ,
   message:'',
   closeFunc: _.noop()
};

export default (state = initialState, payload) => {

   switch (payload.type) {
   case ActionType.SHOW_ERROR:
 
      return {
         ...state,
         showError: true,
         message:payload.message,
         closeFunc: payload.closeFunc || _.noop()
      };
   case ActionType.HIDE_ERROR:
      return {
         ...state,
         showError: false
      };
   default:
      return state;
   }
};