import { push } from 'connected-react-router';
import _ from 'lodash';
import * as ActionType from '../../../Redux/actionTypes';
import { loadOrder } from '../../../Requests/order';
import { showError } from '../../../Redux/actions/gloabl';
import { get } from '../../../Common/utils';

/* 加载餐馆 */
export function loadOrders (){

   return async (dispatch) => {

      /* show loading */
      dispatch({ type: ActionType.SHOW_LOADING });

      try {

         const userId = _.get(get('user'),'_id');

         const orders = await loadOrder(userId);

         dispatch({ type: ActionType.LOAD_ORDER,orders:orders.list });

      } catch (error) {

         dispatch(showError(error.message));

      } finally {

         dispatch({ type: ActionType.HIDE_LOADING });
      }
   };
}
