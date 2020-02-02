import React from 'react';
import { useState,useEffect } from 'react';
import { useMount } from 'react-use';
import { useDispatch,useSelector } from 'react-redux';
import intl from 'react-intl-universal';
import _ from 'lodash';
import  uuidv4  from 'uuid/v4';
import classNames from 'classnames';

/* util */
import { get } from '../../Common/utils';

/* components */
import SingleOrder from './components/SingleOrder';

/* actions */
import { loadOrders } from './state/actions';
import { goRestaurant } from '../../Redux/actions/gloabl';

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
      const token = _.get(get('user'),'token','');

      /* 如果没登录，返回到restaurant页面 */
      if(_.isEmpty(token)){
         dispatch(goRestaurant());
      }else{
         /* 获取restaurants */
         dispatch(loadOrders());
      }
   });

   useEffect(() => {

      setOrderList(renderOrders());
   }, [ orders,language ]);

   /* 渲染order */
   function renderOrders (){

      if(_.isEmpty(orders)){
         return <div> no orders </div>;
      }

      return _.map(orders,(order)=>{

         return (
            <SingleOrder key={ uuidv4() } order={ order }/>
         );
      });

   }

   return (
      <div className={ classNames('containerBetween') }>
         <div className='order-tab'>
            <div className='order-tab-fixed'>
               {intl.get('order.title')}
               <div className='rectangle'></div>
            </div>
         </div>

         <div className='order-list'> {renderOrders()} </div>
      </div>
   );
}

export default Order;