// import { push } from 'connected-react-router';
import _ from 'lodash';
import * as ActionType from '../../../Redux/actionTypes';
import { showError } from '../../../Redux/actions/gloabl';
import { get,set } from '../../../Common/utils';
const { loadMenu: requestMenu } = require('../../../Requests/menu');

/* 加载餐馆 */
export function loadMenu (restaurantId){

   return async (dispatch) => {

      /* show loading */
      dispatch({ type: ActionType.SHOW_LOADING });

      try {

         const menu = await requestMenu({ restaurantId });
         dispatch({ type: ActionType.LOAD_MENU,menu });

      } catch (error) {

         dispatch(showError(error.message));

      } finally {

         dispatch({ type: ActionType.HIDE_LOADING });
      }
   };
}

/* 购物车加食物 */
export function addCart (food, cartId){

   return async (dispatch) => {

      /* show loading */
      dispatch({ type: ActionType.SHOW_LOADING });

      let cart = [];
      try {

         if (food.totalPrice === undefined) {

            food.totalPrice = food.price;
         }

         /* 获取购物车 */
         if (_.isEmpty(get('cart'))) {
            cart = [];
         } else {
            cart = get('cart');
         }

         /* 往cart加入食物 */
         cart.push(food);

         dispatch({ type: ActionType.SAVE_CART, cart });

         /* 往本地存cart信息 */
         set('cart', cart);
         set('cartId', cartId);

      } catch (error) {

         dispatch(showError(error.message));

      } finally {

         dispatch({ type: ActionType.HIDE_LOADING });
      }
   };
}