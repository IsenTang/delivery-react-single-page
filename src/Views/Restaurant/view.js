import React from 'react';
import { useState,useEffect } from 'react';
import { useMount } from 'react-use';
import { useDispatch,useSelector } from 'react-redux';
import _ from 'lodash';
import  uuidv4  from 'uuid/v4';
import moment from 'moment-timezone';

import { getLanguageInfo } from '../../Common/utils';

/* actions */
import { loadRestaurants } from './state/actions';

/* style */
import './style.scss';

/* 餐馆页面 */
function Restaurants (){

   /* dispatch */
   const dispatch = useDispatch();

   const restaurants = useSelector(state => state.restaurant.restaurants);

   let [ rests,setRests ] = useState(null);

   useMount(()=>{

      /* 获取restaurants */
      dispatch(loadRestaurants());
   });

   useEffect(() => {

      const restsList = renderRestaurants(restaurants);

      setRests(restsList);
   }, [ restaurants ]);

   /* 餐馆渲染方式 */
   function renderRestaurants (restaurants){

      /* 先排序餐馆 */
      restaurants = sortRestaurants(restaurants);

      return (
         <div>
            { _.isEmpty(restaurants) ? null : <div>

               { _.map(restaurants,(item)=>{

                  return (<div key={ uuidv4() }>{ getLanguageInfo(item,'name')}</div>);
               }) }
            </div>}
         </div>
      );
   }

   function sortRestaurants (restaurants){

      const openArray = [];
      const closedArray = [];

      let rests = _.cloneDeep(restaurants);

      rests = _.sortBy(restaurants, [ 'featured', true ]);

      rests = _.sortBy(restaurants, 'zscode');

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

   /* 检查是否关门 */
   function checkRestaurantClosed (restaurant) {

      const closed = _.get(restaurant, 'closed', null);

      /* if manually set closed */
      if (closed !== null) {
         return false;
      }

      const timezone = _.get(restaurant, 'timezone');

      /* 获取当地时间 */
      const localTime = moment().tz(timezone).hours() *
      60 + moment().tz(timezone).minutes();

      const dayOfWeek = moment().tz(timezone).isoWeekday();

      const index = dayOfWeek - 1;

      const restaurantTime = _.get(restaurant, `hours[${index}]`);

      /* 开始时间 */
      const start = _.get(restaurantTime, 'start');

      /* 结束时间 */
      const end = _.get(restaurantTime, 'end');

      /* 如果当地时间比结束时间晚，或者当地时间比开始时间早，意味着关门 */
      if (localTime > end || localTime < start) {

         return false;
      }

      return true;

   }

   return (
      <div className="center-box">
         <div>  restaurant </div>
         <div>  {rests} </div>
      </div>
   );
}

export default Restaurants;