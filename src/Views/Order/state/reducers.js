import * as ActionType from '../../../Redux/actionTypes';

const initialState = {  };

export default (state = initialState, payload) => {

   switch (payload.type) {
   case ActionType.LOAD_ORDER:

      return {
         ...state,
         orders: payload.orders
      };
   default:
      return state;
   }
};