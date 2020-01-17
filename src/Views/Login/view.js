import React from 'react';
import { useState } from 'react';
import { useDispatch,useSelector,shallowEqual } from 'react-redux';
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
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
   },
   overlay: { zIndex: 10 }
};

/* 登录页面 */
function Login () {

   const dispatch = useDispatch();

   const [ name,setName ] = useState('');

   const [ password,setPassword ] = useState('');

   const [ signUpName,setSignUpName ] = useState('');

   const [ signUpPassword,setSignUpPassword ] = useState('');

   const [ comfirmSignUpPassword,setComfirmSignUpPassword ] = useState('');

   const isShow = useSelector(state => state.login.isShow,shallowEqual);

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
            <div> {intl.get('login.username')} <input autoFocus onChange={ onChangeName } value={ name }></input></div>
            <div> {intl.get('login.password')} <input type="password" onChange={ onChangePassword } value={ password }></input></div>
            <button onClick={ handleLogin }> {intl.get('login.login')}</button>
            <button onClick={ openSignUpModal }> {intl.get('login.signUp')}</button>
         </div>

         <Modal
            isOpen = { isShow }
            style={ customStyles }
            onRequestClose = { closeSignUpModal }
         >
            <div> {intl.get('login.username')} <input autoFocus onChange={ onChangeSignUpName } value={ signUpName }></input></div>
            <div> {intl.get('login.password')} <input type="password" onChange={ onChangeSignUpPassword } value={ signUpPassword }></input></div>
            <div> {intl.get('login.confirmPassword')} <input type="password" onChange={ onChangeConfirmSignUpPassword } value={ comfirmSignUpPassword }></input></div>
            <button onClick={ handleSignUp }>{intl.get('login.signUp')}</button>
            <button onClick={ closeSignUpModal }>{intl.get('close')}</button>
         </Modal>
      </div>
   );
}

export default Login;