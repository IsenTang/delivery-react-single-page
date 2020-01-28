import _ from 'lodash';

/* 获取购物车总价 */
export function getTotal (cart){

   let price = 0;

   if (!_.isEmpty(cart)) {

      _.forEach(cart, (item) => {

         price += _.get(item, 'totalPrice', 0);
      });
   }

   return price;
}