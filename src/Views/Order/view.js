import React from 'react';
import { useState,useEffect } from 'react';
import { useMount } from 'react-use';
import { useDispatch,useSelector } from 'react-redux';
import intl from 'react-intl-universal';
import _ from 'lodash';
import  uuidv4  from 'uuid/v4';
import classNames from 'classnames';

/* public */

/* components */

/* actions */
import { loadOrders } from './state/actions';

/* style */
import './style.scss';

/* 餐馆页面 */
function Order (){

   /* dispatch */
   const dispatch = useDispatch();

   const [ orderList,setOrderList ] = useState(null);

   /* store */
   const language = useSelector(state => state.language.language);

   const orders = useSelector(state => state.order.orders);

   /* mount */
   useMount(()=>{

      /* 获取restaurants */
      dispatch(loadOrders());
   });

   useEffect(() => {

      // const restsList = renderRestaurants(restaurants);
      setOrderList([]);
   }, [ orders,language ]);

   return (
      <div className={ classNames('containerBetween') }>
            123
      </div>
   );
}

export default Order;