import React from 'react';
import { useMount } from 'react-use';
import { useDispatch,useSelector } from 'react-redux';
import intl from 'react-intl-universal';
import _ from 'lodash';
import  uuidv4  from 'uuid/v4';
import classNames from 'classnames';

/* public */
import { checkRestaurantClosed } from './public';

/* components */
import SingleRestaurant from './components/Restaurant';

/* actions */
import { loadRestaurants } from './state/actions';

/* style */
import './style.scss';

/* 餐馆页面 */
function Restaurants (){

   /* dispatch */
   const dispatch = useDispatch();

   const restaurants = useSelector(state => state.restaurant.restaurants);

   /* store */
   useSelector(state => state.language.language);

   useMount(()=>{

      /* 获取restaurants */
      dispatch(loadRestaurants());
   });

   /* 餐馆渲染方式 */
   function renderRestaurants (restaurants){

      /* 先排序餐馆 */
      restaurants = sortRestaurants(restaurants);

      return (
         <div className='all-rest-box'>
            <div >
               {
                  _.isEmpty(restaurants) ? null : <div>

                     { _.map(restaurants,(item,index)=>{
                        if(index % 2 === 0){
                           return (
                              <div key={ uuidv4() }>
                                 <SingleRestaurant restaurant={ item }/>
                              </div>

                           );
                        }

                     }) }
                  </div>
               }
            </div>
            <div className='rest-gap'>
               {
                  _.isEmpty(restaurants) ? null : <div>

                     { _.map(restaurants,(item,index)=>{
                        if(index % 2 !== 0){
                           return (
                              <div key={ uuidv4() }>
                                 <SingleRestaurant restaurant={ item }/>
                              </div>

                           );
                        }

                     }) }
                  </div>
               }
            </div>
         </div>
      );
   }

   /* 餐馆排序 */
   function sortRestaurants (restaurants){

      const openArray = [];
      const closedArray = [];

      let rests = _.cloneDeep(restaurants);

      rests = _.orderBy(restaurants, [ 'featured','zscore' ],[ 'desc','desc' ]);

      // rests = _.sortBy(rests, 'zscode');

      _.forEach(rests, (item) => {

         if (checkRestaurantClosed(item)) {
            openArray.push(item);
         } else {
            closedArray.push(item);
         }
      });

      /* 开门饭店在前，关门饭店在后 */
      return _.concat(openArray, closedArray);

   }

   return (
      <div className={ classNames('containerBetween') }>
         <div className={ classNames('rest-tab') }>

            {intl.get('restaurant.allRestaurant')}
            <div className='rectangle'></div>

         </div>
         { renderRestaurants(restaurants) }
      </div>
   );
}

export default Restaurants;