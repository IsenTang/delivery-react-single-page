import React,{ useState,useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import intl from 'react-intl-universal';
import Moment from 'moment';
import  uuidv4  from 'uuid/v4';
import classnames from 'classnames';

/* component */
import CartItem  from '../../Menu/components/CartItem';
import LogoImg from '../../../Assets/logo.png';

/* public */
import { getTotal } from '../../../Views/Menu/public';

/* utils */
import { getLanguageInfo,formatPrice } from '../../../Common/utils';

/* style */
import './style.scss';

/* 单个订单组件 */
function SingleOrder ({ order }){

   let orderItemRef = useRef(null);

   const [ expand , setExpand ] = useState(false);

   /* 渲染订单物品 */
   function renderCart (){

      const cart = _.get(order,'cart');

      /* group 为了获取食物数量 */
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
         <div className='order-items'> { orderItems } </div>
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

   function renderImage (){

      return (
         <div className={ classnames('containerRowCenter') }>
            <img src={ LogoImg }/>
         </div>
      );
   }

   function renderFooter (){

      return (
         <div className='order-footer'>
            { expand ? renderImage() : null }
            {/* 总价 */}
            <div className={ classnames('containerBetween','order-total') }>
               <div> {intl.get('menu.total')} </div>
               <div> {formatPrice(getTotal(_.get(order,'cart')))}</div>
            </div>
            {/* more */}
            <div className={ classnames('containerRowCenter','more-btn') }>
               <button className={ classnames('normal-btn') } onClick={ handleMore }> {intl.get('order.more')} </button>
            </div>
         </div>
      );
   }

   /* more button handler */
   function handleMore (e){

      e.preventDefault();

      setExpand(true);

      /* 增加 mouse down 监听，点击组件外，关闭组件 */
      document.addEventListener('mousedown', handleClickOutside);
   }

   /* 点击组件外 */
   function handleClickOutside (e){

      /* 关闭，并移除监听 */
      if (orderItemRef.current &&
         !orderItemRef.current.contains(e.target)) {
         setExpand(false);
         document.removeEventListener('mousedown', this.handleClickOutside);
      }

   }

   return (
      <div className= { classnames('order-item-box',{ 'order-item-box-expand': expand }) } ref={ orderItemRef }>
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