import _ from 'lodash';
import * as ActionType from '../actionTypes';

const initialState = {
   isShow: false ,
   message:'',
   closeFunc: _.noop()
};

export default (state = initialState, payload) => {

   switch (payload.type) {
   case ActionType.SHOW_ALERT:

      return {
         ...state,
         isShow: true,
         message:payload.message,
         closeFunc: payload.closeFunc || _.noop()
      };
   case ActionType.HIDE_ALERT:
      return {
         ...state,
         isShow: false
      };
   default:
      return state;
   }
};