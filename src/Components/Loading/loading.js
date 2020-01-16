import React from 'react';
import { useState } from 'react';
import { useSelector,shallowEqual } from 'react-redux';
import loadingImage from '../../Assets/loading.gif';

import './style.scss';

/* Loading页面 */
function Loading(){

   const isLoading = useSelector(state => state.loading.showLoading);

   return (
      <div >
         {isLoading ?
            <div className='loading-container' >
               <div className='loading-opacityContainer' />
               <div className='loading-image-container'>
                  <img src={loadingImage} className='loading-image' />
               </div>
            </div> :
            null}
      </div>
   );
}

export default Loading;