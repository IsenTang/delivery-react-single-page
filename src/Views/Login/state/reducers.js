import * as ActionType from '../../../Redux/actionTypes';
import { get } from '../../../Common/utils';

const initialState = {
   user:get('user') || null,
   isShow: false
};

export default (state = initialState, payload) => {

   switch (payload.type) {
   case ActionType.SHOW_SIGNUPMODAL:

      return {
         ...state,
         isShow: true
      };
   case ActionType.HIDE_SIGNUPMODAL:
      return {
         ...state,
         isShow: false
      };
   case ActionType.SAVE_USER:
      return {
         ...state,
         user: payload.user
      };
   case ActionType.CLEAR_USER:
      return {
         ...state,
         user:null
      };
   default:
      return state;
   }
};