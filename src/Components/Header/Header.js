import React from 'react';
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';

/* components */
import ProfileDropDown from './components/ProfileDropDown';

/* actions */
import { goRestaurant } from '../../Redux/actions/gloabl';

/* style */
import './style.scss';

function Header ({ children }){

   const dispatch = useDispatch();

   const [ isProfileShow,setIsProfileShow ] = useState(false);

   useSelector(state => state.language.language);

   /* 显示dropdown */
   function showProfile (){

      setIsProfileShow(true);
   }

   return (
      <div >
         <div className='header'>
            <div className={ classnames('containerBetween', 'vertical', 'left') }>
               <img className='logo'
                  alt=''
                  onClick={ ()=>{ dispatch(goRestaurant());} }
                  src={ require('../../Assets/logo.png') }
               />
            </div>
            <div className='profile'>
               <img
                  className='profile-logo'
                  alt=''
                  onClick = { showProfile }
                  src={ require('../../Assets/profile-icon.png') }
               />
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