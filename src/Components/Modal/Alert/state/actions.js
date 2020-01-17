import _ from 'lodash';
import * as ActionType from '../../../../Redux/actionTypes';

/* 关闭错误modal */
export function closeAlert (closeFunc){

   return async (dispatch) => {

      /* 执行close方法 */
      if(_.isFunction(closeFunc)){
         await closeFunc();
      }

      dispatch({ type:ActionType.HIDE_ALERT });
   };
}