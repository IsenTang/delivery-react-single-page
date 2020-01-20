import { push } from 'connected-react-router';
import intl from 'react-intl-universal';
import * as ActionType from '../../../Redux/actionTypes';
import { checkLogin,register } from '../../../Requests/login';
import { showError,alert } from '../../../Redux/actions/gloabl';
import { encode } from '../../../Services/login';
import { set } from '../../../Common/utils';

/* 登录 */
export function login (username,password){

   return async (dispatch) => {

      /* show loading */
      dispatch({ type: ActionType.SHOW_LOADING });

      try {

         /* check login */
         const user = await checkLogin({ username:encode(username), password:encode(password) });

         /* save token and user info in stroe and local storage */
         dispatch({ type: ActionType.SAVE_USER, user });

         set('user',user);

         dispatch(push('/restaurant'));

      } catch (error) {

         dispatch(showError(error.message));

      } finally {

         dispatch({ type: ActionType.HIDE_LOADING });
      }
   };
}

/* 注册 */
export function signUp (name,password){

   return async (dispatch) => {

      /* show loading */
      dispatch({ type: ActionType.SHOW_LOADING });

      try {

         /* check login */
         await register({ username:encode(name), password:encode(password) });

      } catch (error) {

         dispatch(showError(error.message));

      } finally {

         dispatch({ type: ActionType.HIDE_SIGNUPMODAL });
         dispatch(alert(intl.get('login.signUpSuccess')));
         dispatch({ type: ActionType.HIDE_LOADING });
      }
   };
}
