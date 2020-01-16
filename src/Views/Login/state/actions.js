// import { push } from 'connected-react-router';
import * as ActionType from '../../../Redux/actionTypes';
import { checkLogin } from '../../../Requests/login';

/* 登录 */
export function login(name,password){
    
   return async(dispatch) => {

      /* show loading */
      dispatch({ type: ActionType.SHOW_LOADING });

      try {
    
         /* check login */
         const user = await checkLogin({ name, password });

         /* save token and user info  */
         //  dispatch({ type: ActionType.SAVE_USER, user });
    
      } catch (error) {
    
         console.log(error);
         //  dispatch(showError(error.message));
    
         /*
        * dispatch({ type: ActionType.CLEAR_VCODE });
        */
      } finally {
         dispatch({ type: ActionType.HIDE_LOADING });
      }
   };
}