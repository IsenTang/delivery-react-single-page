import React from 'react';
import { useSelector,shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import loadingImage from '../../Assets/loading.gif';

import './style.scss';

/* Loading页面 */
function Loading({ showLoading }){

   const isLoading = useSelector(state => state.loading.showLoading,shallowEqual);

   return (
      <div >
         { showLoading || isLoading ?
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

Loading.propTypes = {
   showLoading: PropTypes.bool
};

export default Loading;