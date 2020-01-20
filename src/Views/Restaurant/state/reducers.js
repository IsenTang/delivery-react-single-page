import * as ActionType from '../../../Redux/actionTypes';

const initialState = {  };

export default (state = initialState, payload) => {

   switch (payload.type) {
   case ActionType.LOAD_RESTAURANT:

      return {
         ...state,
         restaurants: payload.restaurants
      };
   default:
      return state;
   }
};