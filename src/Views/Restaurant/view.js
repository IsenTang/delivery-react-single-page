import React from 'react';
import { useState,useEffect } from 'react';
import { useMount } from 'react-use';
import { useDispatch,useSelector } from 'react-redux';
import _ from 'lodash';

/* public */
import { checkRestaurantClosed } from './public';

/* components */
import SingleRestaurant from './components/restaurant';

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

   /* store */
   const language = useSelector(state => state.language.language);

   useMount(()=>{

      /* 获取restaurants */
      dispatch(loadRestaurants());
   });

   useEffect(() => {

      const restsList = renderRestaurants(restaurants);

      setRests(restsList);
   }, [ restaurants,language ]);

   /* 餐馆渲染方式 */
   function renderRestaurants (restaurants){

      /* 先排序餐馆 */
      restaurants = sortRestaurants(restaurants);

      return (
         <div>
            {
               _.isEmpty(restaurants) ? null : <div>

                  { _.map(restaurants,(item)=>{

                     return (<SingleRestaurant restaurant={ item }/>);
                  }) }
               </div>
            }
         </div>
      );
   }

   /* 餐馆排序 */
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

   return (
      <div className="center-box">
         <div>  {rests} </div>
      </div>
   );
}

export default Restaurants;