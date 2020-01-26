import React from 'react';
import PropTypes from 'prop-types';

import DishImage from '../../../Assets/dark-dish.png';

import './style.scss';

/* 带有盘子的食物图片 */
function DishFood ({ image,height,width }){

   return (
      <div className='rest-image-box'>
         <img src={ DishImage }
            className = 'dish-image'
            style={{
               width,
               height
            }}/>
         <img src={ image }
            className = 'food-image'
            style={{
               width,
               height
            }}
         />
      </div>
   );
}

DishFood.propTypes = {
   image: PropTypes.string.isRequired,
   height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
   ]),
   width: PropTypes.oneOfType([
      PropTypes.number.isRequired,
      PropTypes.string.isRequired,
   ])
};

export default DishFood;