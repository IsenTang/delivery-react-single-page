import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import  uuidv4  from 'uuid/v4';
import { useDispatch,useSelector } from 'react-redux';
import _ from 'lodash';
import classnames from 'classnames';

/* components */
import CartItem from './CartItem';

/* utils */
import { get } from '../../../Common/utils';

/* public */

/* actions */

/* style */
import './style.scss';

/* 单个餐馆组件 */
function Cart (){

   const language = get('language');

   const dispatch = useDispatch();

   /* store */
   /* 获取购物车 */
   let cart =  useSelector(state => state.cart.cart);

   /* 渲染购物车 */
   function renderCart (){

      if(_.isEmpty(cart)){

         return (
            <div className='cartEmptyText'> 请选择加入购物车 </div>
         );
      }

      /* 根据id，获取购物车物品数量 */
      cart = _.groupBy(cart, (item) => item._id);

      return _.map(cart,(item)=>{

         return <CartItem items={ item } key={ uuidv4() }/>;
      });
   }

   return (
      <div>
         {renderCart()}
      </div>
   );
}

Cart.propTypes = {

};

export default Cart;