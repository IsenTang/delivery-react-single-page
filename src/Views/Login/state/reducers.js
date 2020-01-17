import * as ActionType from '../../../Redux/actionTypes';

const initialState = { isShow: false };

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
   default:
      return state;
   }
};