import { push } from 'connected-react-router';
import * as ActionType from '../actionTypes';

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

export function loginOut (){

   return async (dispatch) => {

      // dispatch(push('/login'));
   };
}