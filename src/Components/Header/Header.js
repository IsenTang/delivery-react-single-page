import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import ProfileDropDown from './components/ProfileDropDown';

function Header ({ children }){

   const [ isProfileShow,setIsProfileShow ] = useState(false);

   useSelector(state => state.language.language);

   /* 显示dropdown */
   function showProfile (){

      setIsProfileShow(true);
   }

   return (
      <div style={{ height: '100%' }}>
         <div className='header'>
            <div className={ classnames('containerBetween', 'vertical', 'left') }>
               <img className='logo' src={ require('../../Assets/logo.png') }/>
            </div>
            <div className='profile'>
               <img
                  className='profile-logo'
                  onClick = { showProfile }
                  src={ require('../../Assets/profile-icon.png') }/>
               {isProfileShow ? <ProfileDropDown closeDropDown={ ()=>{ setIsProfileShow(false); } }/> : null}
            </div>
         </div>
         <div className='header-children' id='header-children'>
            {children}
         </div>
      </div>
   );
}

Header.propTypes = {
   children: PropTypes.any
};

export default Header;