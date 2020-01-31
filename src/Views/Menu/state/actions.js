// import { push } from 'connected-react-router';
import _ from 'lodash';
import intl from 'react-intl-universal';
import * as ActionType from '../../../Redux/actionTypes';
import { showError } from '../../../Redux/actions/gloabl';
import { get,set } from '../../../Common/utils';

/* requests */
import { placeOrderRequest } from '../../../Requests/order';
import { loadMenu as requestMenu } from '../../../Requests/menu';

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

/* 往购物车加食物 */
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

         if(!_.isUndefined(cartId)){
            set('cartId', cartId);
         }

      } catch (error) {

         dispatch(showError(error.message));

      } finally {

         dispatch({ type: ActionType.HIDE_LOADING });
      }
   };
}

/* 购物车减少食物 */
export function cartRemove (food){

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

         /* 找到对应食物 */
         const spliceIndex = _.findLastIndex(cart, (item) =>
            item._id  === food._id);

         /* 剔除 */
         cart.splice(spliceIndex, 1);

         dispatch({ type: ActionType.SAVE_CART, cart });

         /* 往本地存cart信息 */
         set('cart', cart);

      } catch (error) {

         dispatch(showError(error.message));

      } finally {

         dispatch({ type: ActionType.HIDE_LOADING });
      }
   };
}

/* 支付 */
export function placeOrder (restId){

   return async (dispatch,getState) => {

      /* show loading */
      dispatch({ type: ActionType.SHOW_LOADING });

      const userId = _.get(getState(),'login.user._id');

      if(!userId){

         dispatch(showError(intl.get('error.need-login')));
         dispatch({ type: ActionType.HIDE_LOADING });
         return;
      }
      try {

         const data = {
            payment:_.get(get('payment'),'value'),
            cart:_.get(getState(),'cart.cart'),
            user:{
               _id:userId
            },
            restaurant:{
               _id: restId
            }
         };

         await placeOrderRequest(data);
      } catch (error) {

         dispatch(showError(error.message));

      } finally {

         dispatch({ type: ActionType.HIDE_LOADING });
      }
   };
}
