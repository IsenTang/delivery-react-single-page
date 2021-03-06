import * as ActionType from '../../../Redux/actionTypes';
import { get } from '../../../Common/utils';

const initialState = {
   restaurant:get('restaurant') || null
};

export default (state = initialState, payload) => {

   switch (payload.type) {
   case ActionType.LOAD_RESTAURANT:

      return {
         ...state,
         restaurants: payload.restaurants
      };
   case ActionType.SAVE_RESTAURANT:

      return {
         ...state,
         restaurant: payload.restaurant
      };
   default:
      return state;
   }
};