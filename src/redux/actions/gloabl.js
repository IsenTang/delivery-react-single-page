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