import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

/* actions */
import { showError } from '../../Redux/actions/gloabl';
import { login } from './state/actions';

/* style */
import './style.scss';
 
/* 登录页面 */
function Login() {

   const dispatch = useDispatch();
    
   const [name,setName] = useState('');

   const [password,setPassword] = useState('');

   /* 登录按钮 */
   function handleLogin(e) {
      e.preventDefault();
      
      /* 检测数据 */
      if(!checkName(name)){
   
         dispatch(showError('请输入正确的用户名，4到16位，字母，数字，下划线，减号。'));
         return;
      }

      if(!checkPassword(password)){
      
         dispatch(showError('输入的密码不符合要求，至少6位，至少1个大写字母，1个小写字母，1个数字，1个特殊符号。'));
         return;
      }

      dispatch(login(name,password));

   }

   /* 检测用户名 */
   function checkName(name){
      /* 4到16位，字母，数字，下划线，减号 */
      const pattern = /^[a-zA-Z0-9_-]{4,16}$/;
      return pattern.test(name);
   }

   /* 检测密码 */
   function checkPassword(password){
      /* 至少6位，至少1个大写字母，1个小写字母，1个数字，1个特殊符号 */
      const pattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
      return pattern.test(password);
   }

   /* 用户名输入 */
   function onChangeName(e){
      setName(e.target.value);
   }

   /* 密码输入 */
   function onChangePassword(e){
      setPassword(e.target.value);
   }

   return (
      <div className="center-box">
         <div>
            <div> 用户名 <input autoFocus onChange={onChangeName}></input></div>
            <div> 密码 <input type="password" onChange={onChangePassword}></input></div>
            <button onClick={handleLogin}>登录</button>
         </div>
      </div>
   );
}

export default Login;