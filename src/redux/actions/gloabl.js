import * as ActionType from '../actionTypes';

/* 显示错误modal */
export function showError(message,closeFunc){

   return async(dispatch) => {
        
      dispatch({type:ActionType.SHOW_ERROR,message,closeFunc});
   };
}