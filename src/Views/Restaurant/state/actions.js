import { push } from 'connected-react-router';
import intl from 'react-intl-universal';
import * as ActionType from '../../../Redux/actionTypes';
import { loadRestaurant } from '../../../Requests/restaurant';
import { showError,alert } from '../../../Redux/actions/gloabl';
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