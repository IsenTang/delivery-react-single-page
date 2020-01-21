import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';

/* utils */
import { getLanguageInfo,lang,get } from '../../../Common/utils';

/* public */
import { checkRestaurantClosed } from '../public';

/* style */
import './style.scss';

const defaultItems =  [
   {
      name: {
         'zh-CN': '红烧狮子头',
         'en-US': 'Stewed Lion Head Chinese Meatballs'
      },
      image: 'https://s3.amazonaws.com/ricepo-food/image-3r7hnd04jyk7nbn3.png'
   },
   {
      name:  {
         'zh-CN': '三杯鸡',
         'en-US': 'Three Cups Chicken'
      },
      image: 'https://s3.amazonaws.com/ricepo-food/image-5b7jxyy2jvu95frk.png'
   },
   {
      name: {
         'zh-CN': '番茄鸡蛋面',
         'en-US': 'Tomato Egg Noodle'
      },
      image:     'https://s3.amazonaws.com/ricepo-food/image-o1bt3qsjz0fhei4.png'
   }
];

/* 单个餐馆组件 */
function SingleRestaurant ({ restaurant }){

   const language = get('language');

   const [ showName,setshowName ] = useState(true);

   /* 渲染餐馆tag */
   const renderTags = () => {

      console.log(_.get(restaurant,'items'));
      const tags = _.get(restaurant, 'tags');
      let str = '';

      _.forEach(tags, (tag) => {
         str += `${lang(`tags.${tag}`, {}, '')} `;
      });

      return str;

   };

   const renderImages = () => (
      <div className='imgBox' >
         <div className='imgBox1'>
            <img src={ _.get(restaurant, 'items[0].image.url', defaultItems[0].image) } className='img1'/>
            <div className={ `rest-food-name ${showName ? '' : 'rest-food-name-opacity'}` }>
               {_.get(restaurant, `items[0].name[${language}]`, defaultItems[0].name[`${language}`])}</div>
         </div>
         <div className='imgBox2' id={ 'imgBox2' }>
            <img src={ _.get(restaurant, 'items[1].image.url', defaultItems[1].image) } className='img2'/>
            <div className={ 'rest-food-name' }>{showName ?
               _.get(restaurant, `items[1].name[${language}]`, defaultItems[1].name[`${language}`]) :
               ''}</div>
         </div>
         <div className='imgBox3'>
            <img src={ _.get(restaurant, 'items[2].image.url', defaultItems[2].image) } className='img3'/>
            <div className={ 'rest-food-name' }>{showName ?
               _.get(restaurant, `items[2].name[${language}]`, defaultItems[2].name[`${language}`]) :
               ''}</div>
         </div>
      </div>
   );

   return (
      <div>
         <div className = { classnames('titleText') }>{getLanguageInfo(restaurant,'name')}</div>
         <div className = { classnames('subTitleText') }>{ renderTags()}</div>
         <div> {renderImages()} </div>
      </div>
   );
}

SingleRestaurant.propTypes = {
   restaurant: PropTypes.any
};

export default SingleRestaurant;