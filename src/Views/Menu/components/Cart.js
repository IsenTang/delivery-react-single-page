import React,{ useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import  uuidv4  from 'uuid/v4';
import { useSelector,useDispatch } from 'react-redux';
import _ from 'lodash';
import classnames from 'classnames';
import intl from 'react-intl-universal';
import Select, { components } from 'react-select';

/* components */
import CartItem from './CartItem';
import ClosedButton from '../../../Assets/close_btn.png';
import LogoImg from '../../../Assets/logo.png';
import alipay from '../../../Assets/alipay.png';
import wechat from '../../../Assets/wechatpay.png';
import applePay from '../../../Assets/applepay_small.png';

/* utils */
import { formatPrice,get,set } from '../../../Common/utils';

/* public */
import { getTotal } from '../public';

/* actions */
import { placeOrder } from '../state/actions';

/* style */
import './style.scss';

const logoMap = {
   wechat,
   alipay,
   applePay
};

/* 单个餐馆组件 */
function Cart (){

   const dispatch = useDispatch();

   const [ price,setPrice ] = useState('$0.00');

   const [ isExpand,setIsExpand ] = useState(false);

   const [ payment,setPayment ] = useState(get('payment') || null);

   /* store */
   /* 获取购物车 */
   const cart = useSelector(state => state.cart.cart);

   useSelector(state => state.language.language);

   useEffect(() => {

      setPrice(formatPrice(getTotal(cart)));
   }, [ cart ]);

   /* 渲染购物车 */
   function renderCart (){

      if(_.isEmpty(cart)){

         return (
            <div className='cart-empty-text'> {intl.get('menu.cartTitle')} </div>
         );
      }

      let cloneCart = _.cloneDeep(cart);
      /* 根据id，获取购物车物品数量 */
      cloneCart = _.groupBy(cart, (item) => item._id);

      return _.map(cloneCart,(item)=>{

         return <CartItem items={ item } key={ uuidv4() }/>;
      });
   }

   /*
    * 打开关闭cart modal
    * 如果已经打开，就是支付
    */
   function expandOrPlaceOrder (){

      if(isExpand){
         /* 支付 */
         dispatch(placeOrder());
      }else{
         setIsExpand( true );
      }

   }

   /* 选择支付方式 */
   function selectPayment (obj){

      setPayment(obj);

      /* 在本地存储上一次的支付方式 */
      set('payment',obj);
   }

   /* 渲染modal左侧 */
   function renderExpandLeft (){

      const options = [
         { value: 'alipay' },
         { value: 'wechat' },
         { value: 'applePay' },
      ];

      const dot = () => ({
         alignItems:     'center',
         display:        'flex',
         justifyContent: 'center'
      });

      const colourStyles = {
         control:     (styles, opts) => ({
            ...styles,
            ...dot(),
            borderRadius:    '25px',
            height:          '30px',
            minHeight:       '30px',
            border:          '1px solid #afafaf',
            boxShadow:       '0',
            backgroundColor: opts.isFocused ? '#e8e8e8' : 'transparent'
         }),
         option:      (styles, opts) => ({
            ...styles,
            padding:         '7.5px 30px 7.5px 10px',
            backgroundColor: opts.isFocused && !_.get(opts, 'data.disabled') ? '#f7f7f7' : 'white',
            ':active':       null
         }),
         input:       styles => ({ ...styles, ...dot() }),
         placeholder: styles => ({ ...styles, color: '#797979', fontSize: '16px' }),
         singleValue: (styles) => ({ ...styles, ...dot(), width: '90%' }),
         container:   styles => ({ ...styles }),
         menuList:    styles => ({ ...styles, height: '150px' })
      };

      const SingleValue = ({ ...props }) => <components.SingleValue { ...props }>
         <div className={
            classnames('payment-select-container',
               'containerRow',
               'verticalhorizontally',
               'p2')
         }
         >
            {
               (() => {
                  if (_.has(logoMap, props.data.value)) {
                     return <img
                        src={ logoMap[props.data.value] }
                        className={ classnames('payment-select-logo') }
                     />;
                  }
               })()
            }
         </div>
      </components.SingleValue>;

      const Option = (props) => {

         return <components.Option { ...props }>
            <div
               className={ classnames('payment-select-container', 'payment-select-option', 'containerRow', 'verticalhorizontally') }
            >
               {
                  (() => {

                     if (_.has(logoMap, props.value)) {
                        return <img src={ logoMap[props.value] } className='payment-select-logo' />;
                     }

                  })()
               }
            </div>
         </components.Option>;
      };

      Option.propTypes = {
         value: PropTypes.string
      };

      SingleValue.propTypes = {
         data: PropTypes.object
      };

      return(
         <div className={ classnames('containerCol') }>
            <div className={ classnames('containerRowCenter',{ 'not-visible': !isExpand,'visible': isExpand }) }>
               <img src={ LogoImg }/>
            </div>

            <div className={ classnames('containerRowAlign','horizontally',{ 'not-visible': !isExpand,'visible': isExpand }) }>
               <div className={ classnames('menu-cart-payment-input') }>
                  <Select
                     options={ options }
                     styles={ colourStyles }
                     value = { payment }
                     placeholder={ intl.get('menu.choose-payment') }
                     components={{ DropdownIndicator: null, Option: Option, SingleValue: SingleValue }}
                     blurInputOnSelect={ true }
                     isSearchable={ false }
                     onChange={ selectPayment }
                  />
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className={ classnames('containerBetween') }>
         {/* 关闭按钮 */}
         { isExpand ? <button
            onClick={ ()=>{ setIsExpand(false);} }
            className={ classnames('menu-cart-closed') }
         >
            <img src={ ClosedButton } className={ classnames('menu-cart-closed-btn','cursor') }></img>
         </button> : null}

         {/* 主页面，expand or normal */}
         <div className={ classnames('containerBetween',{ 'container-expand' : isExpand }) }>
            <div className={ classnames('cart-left',{ 'cart-left-expand':isExpand }) }>
               { renderExpandLeft() }
            </div>
            <div className = { classnames('menu-cart-main-container',{ 'menu-cart-main-container-expand': isExpand }) }>

               {/* cart items */}
               <div classnames='menu-cart-items'>{renderCart()}</div>

               {/* total button */}
               <div>
                  { isExpand ?
                     <div className={ classnames('containerBetween','menu-cart-total') }>
                        <div> {intl.get('menu.total')} </div>
                        <div>{ price }</div>
                     </div>
                     : null}
                  <button className = { classnames('menu-cart-subtotal-btn',{ 'menu-cart-subtotal-btn-expand':isExpand }) }
                     onClick={ expandOrPlaceOrder }
                     disabled = { _.isEmpty(cart) }
                  >
                     { isExpand ? intl.get('menu.place-order') : price}
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

Cart.propTypes = {

};

export default Cart;