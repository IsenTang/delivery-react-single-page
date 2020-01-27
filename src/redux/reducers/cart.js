import * as ActionType from '../actionTypes';
import { get } from '../../Common/utils';

const initialState = { cart: get('cart') || [] };

export default (state = initialState, payload) => {

   switch (payload.type) {
   case ActionType.SAVE_CART:

      return {
         ...state,
         cart:payload.cart
      };
   case ActionType.CLEAR_CART:

      return {
         ...state,
         cart:[]
      };

   default:
      return state;
   }
};