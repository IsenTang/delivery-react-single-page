import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/* actions */
import { addCart,CartRemove } from '../state/actions';

/* utils */
import { formatPrice,getLanguageInfo } from '../../../Common/utils';

/* 购物车单项 */
function CartItem ({ items }){

   const dispatch = useDispatch();
   /* 计算总价 */
   const renderPrice = () => {

      let totalPrice = 0;

      if (items.length > 1) {

         _.forEach(items, (item) => {

            totalPrice += item.totalPrice || item.price;
         });
      } else {

         totalPrice = items[0].totalPrice || items[0].price;
      }

      return `${formatPrice(totalPrice)}`;

   };

   return (
      <div className={ classnames('containerBetween', 'vertical') }>
         <div> { getLanguageInfo(items[0],'name') }</div>

         <div className={ classnames('containerRow') }>

            {/* 价格 */}
            <div className='cart-item-price' >{ renderPrice() }</div>
            {/* 减号 */}
            <button className='cart-remove-button' onClick={ ()=>{ dispatch(CartRemove(items[0]));} }>-</button>
            {/* 数量 */}
            <div className='cart-item-count'>{items.length}</div>
            {/* 加号 */}
            <button className='cart-add-button' onClick={ ()=>{ dispatch(addCart(items[0]));} }>+</button>

         </div>
      </div>
   );
}

CartItem.propTypes = {
   items: PropTypes.object
};

export default CartItem;