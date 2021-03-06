import React from 'react';
import { useMount } from 'react-use';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import intl from 'react-intl-universal';
import _ from 'lodash';
import classnames from 'classnames';
import * as ActionType from '../../Redux/actionTypes';

/* components */
import Cart from './components/Cart';

/* actions */
import { loadMenu,addCart } from './state/actions';

/* public */
import { renderTags } from '../Restaurant/public';

/* utils */
import { formatPrice,get,set,getLanguageInfo } from '../../Common/utils';

/* style */
import './style.scss';

/* 餐馆页面 */
function Menu (){

   /* dispatch */
   const dispatch = useDispatch();

   /* store */
   const language = useSelector(state => state.language.language);

   const menu = useSelector(state => state.menu);

   const cart = useSelector(state => state.cart.cart);

   const restaurant = get('restaurant');

   const { restId } = useParams();

   useMount(()=>{

      /* 查看cart信息，如果不是同一家餐厅，清空cart */
      const cartId = get('cartId');

      if(cartId !== restId){

         set('cart',[]);

         dispatch({ type: ActionType.CLEAR_CART });
      }

      /* 获取restaurants */
      dispatch(loadMenu(restId));
   });

   /* 菜单渲染 */
   function renderMenu (){

      const categories = _.get(menu, 'categories');

      const foods = _.get(menu, 'foods');

      if(_.isEmpty(foods)){
         return <div> {intl.get('menu.no-menu')} </div>;
      }

      return _.map(categories, (categorie) => {

         const categorieId = _.get(categorie, '_id');

         /* get categorie food by categorie id */
         let categorieFood = _.filter(foods, { category: { _id: categorieId } });

         /* if empty return null */
         if (_.isEmpty(categorieFood)) {
            return null;
         }

         return (<div key={ categorie._id } className= 'category-box' >
            <div >
               <div className='titleText'>{categorie.name[`${language}`]}</div>
               <div className='rectangle' style={{ position : 'relative', left : 0 }}/>
            </div>

            <div>
               {categorieId === 'query' && _.isEmpty(categorieFood) ?
                  <div className='noMatchFood'>{intl.get('menu.no-matching-food')}</div> :
                  renderFoodList(categorieFood)}
               <div className='cateBoxBottom'/>
            </div>
         </div>);
      });
   }

   /* 渲染每个类别的食物 */
   function renderFoodList (foods) {
      return _.map(foods, (food) => {

         /* 在cart中寻找对应的food */
         const index = _.findIndex(cart, { _id: food._id });

         /* food 的数量 */
         let length = 0;

         /* 如果cart中有food */
         if (index !== -1) {

            const afterGroupCart = _.groupBy(cart, '_id');

            /* 获取group之后的数量 */
            _.forEach(afterGroupCart, (item, i) => {

               if (i === food._id) {
                  length = item.length;
               }
            });
         }

         const availableStyle = { opacity: 0.2 };

         return (
            <div key={ food._id } className={ classnames('menu-food-item','cursor') }  onClick={ () => addFood(food) }>
               {
                  length !== 0 ?
                     <div className='menu-count'>
                        <div className='menu-count-text'>{length}
                        </div>
                     </div> :
                     null
               }

               <div className={ classnames('containerBetween','cursor') }>
                  {/* food name */}
                  <div
                     className={ classnames('menu-text','cursor') }
                     style={ food.available ? null : availableStyle }>
                     { food.name[`${language}`] }
                  </div>

                  {/* food price */}
                  <div className={ classnames('menu-price','cursor') }
                     style={ food.available ? null : availableStyle }>
                     {formatPrice(food.price)}
                  </div>
               </div>

            </div>);

      });
   }

   /* 增加食物 */
   function addFood (food){

      /* 如果时间不对 */
      if (!food.available) {

         return;
      }

      dispatch(addCart(food,restId));
   }

   return (
      <div className='menu-box'>
         <div className={ classnames('titleText') }>
            { getLanguageInfo(restaurant,'name') }
         </div>
         <div className={ classnames('subTitleText') }>
            { renderTags(restaurant) }
         </div>

         <div className='all-category-box'>
            {renderMenu()}
         </div>
         <div className='menu-cart-container'>
            <div className='menu-cart-content'>
               <Cart/>
            </div>
         </div>

      </div>
   );
}

export default Menu;