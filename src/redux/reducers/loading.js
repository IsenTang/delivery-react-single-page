import * as ActionType from '../actionTypes';

const initialState = { showLoading: false };

export default (state = initialState, payload) => {

   switch (payload.type) {
   case ActionType.SHOW_LOADING:
      return {
         ...state,
         showLoading: true
      };
   case ActionType.HIDE_LOADING:
      return {
         ...state,
         showLoading: false
      };
   default:
      return state;
   }
};