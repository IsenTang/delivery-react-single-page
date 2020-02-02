import React from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/* actions */
import { addCart,cartRemove } from '../state/actions';

/* utils */
import { formatPrice,getLanguageInfo } from '../../../Common/utils';

/* 购物车单项 */
function CartItem ({ items,editable,expand }){

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
      <div className={ classnames('containerBetween', 'vertical','cart-item') }>
         <div className='cart-item-name'> { getLanguageInfo(items[0],'name') }</div>

         <div className={ classnames('containerRow') }>

            {/* 价格 */}
            {expand ? <div className='cart-item-price' hidden={ !expand }>{ renderPrice() }</div> : null}
            {/* 减号 */}
            {editable ? <button className='cart-remove-button' onClick={ ()=>{ dispatch(cartRemove(items[0]));} }>-</button> : null}
            {/* 数量 */}
            <div className={ editable ? 'cart-item-count' : 'cart-item-count-no-editable' }>{items.length}</div>
            {/* 加号 */}
            {editable ? <button className='cart-add-button' onClick={ ()=>{ dispatch(addCart(items[0]));} }>+</button> : null}

         </div>
      </div>
   );
}

CartItem.propTypes = {
   items: PropTypes.array,
   editable:PropTypes.bool,
   expand:PropTypes.bool,
};

CartItem.defaultProps = {
   editable: true,
   expand:true
};

export default CartItem;