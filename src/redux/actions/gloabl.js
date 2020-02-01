import { push } from 'connected-react-router';
import * as ActionType from '../actionTypes';
import { set } from '../../Common/utils';

/* 显示错误modal */
export function showError (message,closeFunc){

   return async (dispatch) => {

      dispatch({ type:ActionType.SHOW_ERROR,message,closeFunc });
   };
}

/* 弹窗提示 */
export function alert (message,closeFunc){

   return async (dispatch) => {

      dispatch({ type:ActionType.SHOW_ALERT,message,closeFunc });
   };
}

/* 跳转到login页面 */
export function goLogin (){

   return async (dispatch) => {

      dispatch(push('/login'));
   };
}

export function logOut (){

   return async (dispatch) => {

      set('user',null);

      dispatch({ type: ActionType.CLEAR_USER });
   };
}

/*  跳转到restaurant */
export function goRestaurant (){

   return async (dispatch) => {

      /* show loading */
      dispatch({ type: ActionType.SHOW_LOADING });

      try {

         dispatch(push('/restaurant'));

      } catch (error) {

         dispatch(showError(error.message));

      } finally {

         dispatch({ type: ActionType.HIDE_LOADING });
      }
   };
}