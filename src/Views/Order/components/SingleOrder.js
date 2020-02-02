import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import intl from 'react-intl-universal';
import Moment from 'moment';
import  uuidv4  from 'uuid/v4';
import classnames from 'classnames';

/* component */
import CartItem  from '../../Menu/components/CartItem';

/* public */
import { getTotal } from '../../../Views/Menu/public';

/* utils */
import { getLanguageInfo,get,formatPrice } from '../../../Common/utils';

/* style */
import './style.scss';

/* 单个订单组件 */
function SingleOrder ({ order }){

   const language = get('language');

   const dispatch = useDispatch();

   const [ expand , setExpand ] = useState(false);

   /* 渲染订单物品 */
   function renderCart (){

      const cart = _.get(order,'cart');

      const orderItems = _(cart)
         .groupBy(i => i._id)
         .map(item => {
            return (
               <CartItem
                  key={ uuidv4() }
                  items={ item }
                  editable={ false }
                  expand={ expand }
               />
            );
         }).value();
      return (
         <div className='order-items'> { orderItems}</div>
      );

   }

   function renderTitle (){

      return (
         <div className='order-title'>
            {/* 餐馆名 */}
            <div className={ classnames('titleText','order-item-name') } title={ getLanguageInfo(order,'restaurant.name') }>
               {getLanguageInfo(order,'restaurant.name')}
            </div>
            {/* 日期 */}
            <div className = { classnames('containerRowCenter','subTitleText') } style={{ width :'auto' }}>
               { Moment(order.createdAt).format('YYYY-MM-DD HH:mm')}
            </div>
         </div>
      );
   }

   function renderFooter (){

      return (
         <div className='order-footer'>
            {/* 总价 */}
            <div className={ classnames('containerBetween','order-total') }>
               <div> {intl.get('menu.total')} </div>
               <div> {formatPrice(getTotal(_.get(order,'cart')))}</div>
            </div>
            {/* more */}
            <div className={ classnames('containerRowCenter','more-btn') }>
               <button className={ classnames('normal-btn') } onClick={ ()=>{ setExpand(true); } }> {intl.get('order.more')} </button>
            </div>
         </div>
      );
   }

   return (
      <div className='order-item-box'>
         {renderTitle()}
         {renderCart()}
         {renderFooter()}
      </div>
   );
}

SingleOrder.propTypes = {
   order: PropTypes.object
};

export default SingleOrder;