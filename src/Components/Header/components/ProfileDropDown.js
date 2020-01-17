import React from 'react';
import { useEffect,useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';
import  uuidv4  from 'uuid/v4';
import { useDispatch,useSelector } from 'react-redux';

import { get } from '../../../Common/utils';
import { changeLanguage } from '../state/actions';

function ProfileDropDown ({ closeDropDown }){

   const dispatch = useDispatch();

   const [ wrapperRef,setWrapperRef ] = useState();

   useSelector(state => state.language.language);

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

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   });

   const langButtons = _.map(lang, (l) => {
      let id = '';

      if (l.code === language) { id = 'b-b-w-w'; }

      return <button id={ id } key={ uuidv4() } type='button' onClick = { () => onClickLanguage(l.code) }>
         {l.show}
      </button>;
   });

   return (
      <div className='profile-dd' ref={ (e)=>{ setWrapperRef(e); } }>

         { !_.isEmpty(user) ?
            null :
            <button className='profile-button' type='button' onClick={ () => {  } }>
               {intl.get('login')}
            </button>
         }
         <div className='language-button'>
            {langButtons}
         </div>
         { !_.isEmpty(user) ?
            <button className='profile-button log-out' type='button' onClick={ this.handleLogout }>
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