// import { push } from 'connected-react-router';
import * as ActionType from '../../../Redux/actionTypes';
import { checkLogin } from '../../../Requests/login';
import { showError } from '../../../Redux/actions/gloabl';

/* 登录 */
export function login(name,password){
    
   return async(dispatch) => {

      /* show loading */
      dispatch({ type: ActionType.SHOW_LOADING });

      try {
    
         /* check login */
         await checkLogin({ name, password });

         /* save token and user info  */
         //  dispatch({ type: ActionType.SAVE_USER, user });
    
      } catch (error) {
    
         dispatch(showError(error.message));
    
      } finally {
         dispatch({ type: ActionType.HIDE_LOADING });
      }
   };
}
