import { push } from 'connected-react-router';
import * as ActionType from '../../../Redux/actionTypes';
import { loadRestaurant } from '../../../Requests/restaurant';
import { showError } from '../../../Redux/actions/gloabl';
import { set } from '../../../Common/utils';

/* 加载餐馆 */
export function loadRestaurants (){

   return async (dispatch) => {

      /* show loading */
      dispatch({ type: ActionType.SHOW_LOADING });

      try {

         const restaurants = await loadRestaurant();
         dispatch({ type: ActionType.LOAD_RESTAURANT,restaurants:restaurants.list });

      } catch (error) {

         dispatch(showError(error.message));

      } finally {

         dispatch({ type: ActionType.HIDE_LOADING });
      }
   };
}

/* 去menu页面 */
export function goMenu (restaurant){

   return async (dispatch) => {

      /* show loading */
      dispatch({ type: ActionType.SHOW_LOADING });

      dispatch({ type: ActionType.SAVE_RESTAURANT,restaurant });

      set('restaurant',restaurant);

      dispatch(push(`/menu/${restaurant._id}`));

      dispatch({ type: ActionType.HIDE_LOADING });
   };
}