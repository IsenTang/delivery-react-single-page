import React from 'react';
import { useState } from 'react';
import { useDispatch,useSelector,shallowEqual } from 'react-redux';
import classnames from 'classnames';
import intl from 'react-intl-universal';
import Modal from 'react-modal';

/* actions */
import { showError } from '../../Redux/actions/gloabl';
import { login,signUp } from './state/actions';

import * as ActionType from '../../Redux/actionTypes';

/* style */
import './style.scss';

/* http://reactcommunity.org/react-modal/accessibility/ 为了残障人士的属性：aria-xxx (Accessible Rich Internet Application) */
Modal.setAppElement('#root');

/* modal style */
const customStyles = {
   content : {
      top : '50%',
      right : 'auto',
      bottom : 'auto',
      left : '50%',
      marginRight : '-50%',
      transform : 'translate(-50%, -50%)',
   },
   overlay: { zIndex : 10, }
};

/* 登录页面 */
function Login () {

   const dispatch = useDispatch();

   /* state */
   const [ name,setName ] = useState('');

   const [ password,setPassword ] = useState('');

   const [ signUpName,setSignUpName ] = useState('');

   const [ signUpPassword,setSignUpPassword ] = useState('');

   const [ comfirmSignUpPassword,setComfirmSignUpPassword ] = useState('');

   /* store */
   const isShow = useSelector(state => state.login.isShow,shallowEqual);

   useSelector(state => state.language.language);

   /* 检测用户名 */
   function checkName (name){
      /* 4到16位，字母，数字，下划线，减号 */
      const pattern = /^[a-zA-Z0-9_-]{4,16}$/;
      return pattern.test(name);
   }

   /* 检测密码 */
   function checkPassword (password){
      /* 至少6位，至少1个大写字母，1个小写字母，1个数字，1个特殊符号 */
      const pattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
      return pattern.test(password);
   }

   /* 用户名输入 */
   function onChangeName (e){
      setName(e.target.value);
   }

   /* 密码输入 */
   function onChangePassword (e){
      setPassword(e.target.value);
   }

   /* 登录按钮 */
   function handleLogin (e) {
      e.preventDefault();

      /* 检测数据 */
      if(!checkName(name)){

         dispatch(showError(intl.get('login.error.name')));
         return;
      }

      if(!checkPassword(password)){

         dispatch(showError(intl.get('login.error.password')));

         setPassword('');
         return;
      }

      dispatch(login(name,password));

   }

   /* 打开注册modal */
   function openSignUpModal (e){
      e.preventDefault();

      dispatch({ type:ActionType.SHOW_SIGNUPMODAL });
   }

   /* 关闭注册modal */
   function closeSignUpModal (e){
      e.preventDefault();

      dispatch({ type:ActionType.HIDE_SIGNUPMODAL });
   }

   function onChangeSignUpName (e){

      setSignUpName(e.target.value);
   }

   function onChangeSignUpPassword (e){

      setSignUpPassword(e.target.value);
   }

   function onChangeConfirmSignUpPassword (e){

      setComfirmSignUpPassword(e.target.value);
   }

   /* 注册 */
   function handleSignUp (){

      /* 检测数据 */
      if(!checkName(signUpName)){

         dispatch(showError(intl.get('login.error.name')));
         return;
      }

      if(!checkPassword(signUpPassword)){

         dispatch(showError(intl.get('login.error.password')));
         return;
      }

      if(signUpPassword !== comfirmSignUpPassword){

         dispatch(showError(intl.get('login.error.comfirmPassword')));
         return;
      }

      dispatch(signUp(signUpName,signUpPassword));
   }

   return (
      <div className="center-box">
         <div>
            <div className={ classnames('input-box','login-input-box') }>
               <div className='input-title'> {intl.get('login.username')} </div>
               <div>
                  <input autoFocus onChange={ onChangeName } value={ name } className='input'></input>
               </div>
            </div>
            <div className="input-box">
               <div className='input-title'> {intl.get('login.password')} </div>
               <input type="password" onChange={ onChangePassword } value={ password } className='input'></input>
            </div>

            <div className={ classnames('login-btn-box','containerCol','vertical') }>
               <button onClick={ handleLogin } className={ classnames('normal-btn','login-btn') }> {intl.get('login.login')}</button>
               <button onClick={ openSignUpModal } className={ classnames('normal-btn','sign-up-btn') }> {intl.get('login.signUp')}</button>
            </div>
         </div>

         {/* 注册modal */}
         <Modal
            isOpen = { isShow }
            style={ customStyles }
            onRequestClose = { closeSignUpModal }
         >
            <div className={ classnames('sign-up-modal','containerCol','vertical','space-between') }>
               <div className={ classnames('sign-up-type-in') }>
                  <div className={ classnames('input-box','sign-up-type-input') }>
                     <div className='input-title'>{intl.get('login.username')}</div>
                     <input className='input' autoFocus onChange={ onChangeSignUpName } value={ signUpName }></input>
                  </div>
                  <div className={ classnames('input-box','sign-up-type-input') }>
                     <div className='input-title'> {intl.get('login.password')} </div>
                     <input className='input' type="password" onChange={ onChangeSignUpPassword } value={ signUpPassword }></input>
                  </div>
                  <div className={ classnames('input-box','sign-up-type-input') }>
                     <div className='input-title'> {intl.get('login.confirmPassword')} </div>
                     <input className='input' type="password" onChange={ onChangeConfirmSignUpPassword } value={ comfirmSignUpPassword }></input>
                  </div>
               </div>
               <div className={ classnames('containerCol','vertical','space-between','sign-up-btn-box') }>
                  <button className={ classnames('normal-btn','login-btn') } onClick={ handleSignUp }>{intl.get('login.signUp')}</button>
                  {/* <button className={ classnames('normal-btn','signUp-btn') } onClick={ closeSignUpModal }>{intl.get('close')}</button> */}
               </div>
            </div>
         </Modal>
      </div>
   );
}

export default Login;