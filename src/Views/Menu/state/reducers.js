import * as ActionType from '../../../Redux/actionTypes';

const initialState = {  };

export default (state = initialState, payload) => {

   switch (payload.type) {
   case ActionType.LOAD_MENU:

      return {
         ...state,
         categories: payload.menu.categories,
         foods:payload.menu.foods,
      };
   default:
      return state;
   }
};