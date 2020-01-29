import React,{ useState,useEffect } from 'react';
import  uuidv4  from 'uuid/v4';
import { useDispatch,useSelector } from 'react-redux';
import _ from 'lodash';
import classnames from 'classnames';

/* components */
import CartItem from './CartItem';

/* utils */
import { get,formatPrice } from '../../../Common/utils';

/* public */
import { getTotal } from '../public';

/* actions */

/* style */
import './style.scss';

/* 单个餐馆组件 */
function Cart (){

   const language = get('language');

   const dispatch = useDispatch();

   const [ price,setPrice ] = useState('$0.00');

   /* store */
   /* 获取购物车 */
   const cart = useSelector(state => state.cart.cart);

   useEffect(() => {

      setPrice(formatPrice(getTotal(cart)));
   }, [ cart ]);

   /* 渲染购物车 */
   function renderCart (){

      if(_.isEmpty(cart)){

         return (
            <div className='cartEmptyText'> 请选择加入购物车 </div>
         );
      }

      let cloneCart = _.cloneDeep(cart);
      /* 根据id，获取购物车物品数量 */
      cloneCart = _.groupBy(cart, (item) => item._id);

      return _.map(cloneCart,(item)=>{

         return <CartItem items={ item } key={ uuidv4() }/>;
      });
   }

   return (
      <div className = { 'menu-cart-main-container' }>
         <div>{renderCart()}</div>
         <div className = { classnames('vertical') }>

            <button className = 'menu-cart-subtotal-btn'>{price}</button>
         </div>
      </div>
   );
}

Cart.propTypes = {

};

export default Cart;