import React from 'react';
import { useEffect,useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';
import classnames from 'classnames';
import  uuidv4  from 'uuid/v4';
import { useDispatch,useSelector } from 'react-redux';

import { get } from '../../../Common/utils';

/* actions */
import { changeLanguage } from '../state/actions';
import { goLogin,loginOut } from '../../../Redux/actions/gloabl';

function ProfileDropDown ({ closeDropDown }){

   const dispatch = useDispatch();

   const [ wrapperRef,setWrapperRef ] = useState();

   useSelector(state => state.language.language);

   /* 获取当前页面路径 */
   const path =  useSelector(state => state.router.location.pathname);

   /* 用户信息 */
   const user = get('user');
   const language = get('language');

   const lang = [
      { code: 'zh-CN', show: '中' },
      { code: 'en-US', show: 'En' }
   ];

   /* 改变语言 */
   function onClickLanguage (lang){

      dispatch(changeLanguage(lang));
   }

   /* 点击外围，关闭dropDown */
   function handleClickOutside (e){

      if (wrapperRef &&
         !wrapperRef.contains(e.target) &&
         e.target.className !== 'profile-logo') {
         closeDropDown();
      }

   }

   /* add listener & remove listener */
   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   });

   /* 切换语言button */
   const langButtons = _.map(lang, (l) => {
      let id = '';

      if (l.code === language) { id = 'on-choose'; }

      return <button id={ id } key={ uuidv4() } type='button' onClick = { () => onClickLanguage(l.code) }>
         {l.show}
      </button>;
   });

   return (
      <div className='profile-drop-down' ref={ (e)=>{ setWrapperRef(e); } }>

         {/* 如果没有登录，或者在登录页面，不显示登录按钮 */}
         { !_.isEmpty(user) || (path == '/login') ?
            null :
            <button className='profile-button' type='button' onClick={ () => { closeDropDown(); dispatch(goLogin()); } }>
               {intl.get('login.login')}
            </button>
         }
         <div className='language-button'>
            {langButtons}
         </div>
         { !_.isEmpty(user) ?
            <button className={ classnames('profile-button log-out') } type='button' onClick={ ()=>{ dispatch(loginOut()); } }>
               {intl.get('logout')}
            </button> :
            null}
      </div>
   );
}

ProfileDropDown.propTypes = {
   closeDropDown: PropTypes.func
};

export default ProfileDropDown;