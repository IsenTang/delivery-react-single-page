import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import  uuidv4  from 'uuid/v4';
import classnames from 'classnames';

/* components */
import DishFood from '../components/DishFood';

/* utils */
import { getLanguageInfo,lang,get } from '../../../Common/utils';

/* actions */
import { goMenu } from '../state/actions';

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

   const dispatch = useDispatch();

   const [ showName,setshowName ] = useState(false);

   const [ uuid ] = useState(uuidv4());

   /* 渲染餐馆tag */
   const renderTags = () => {

      const tags = _.get(restaurant, 'tags');
      let str = '';

      _.forEach(tags, (tag) => {
         str += `${lang(`tags.${tag}`, {}, '')} `;
      });

      return str;

   };

   const renderImages = () => (
      <div className='img-box' >
         <div className='img-box-1'>
            <div className={ 'rest-food-name' }>{showName ?
               _.get(restaurant, `items[0].name[${language}]`, defaultItems[0].name[`${language}`]) : ''}
            </div>
            <DishFood
               image={ _.get(restaurant, 'items[0].image.url', defaultItems[0].image) }
               width={ '100%' }
            />

         </div>
         <div className={ classnames('img-box-2',showName ? 'img-box-2-go-left' : '') } id={ `img-box-2-${uuid}` }>
            <div className={ 'rest-food-name' }>{showName ?
               _.get(restaurant, `items[1].name[${language}]`, defaultItems[1].name[`${language}`]) : ''}
            </div>
            <DishFood
               image={ _.get(restaurant, 'items[1].image.url', defaultItems[1].image) }
               width={ '100%' }
            />
         </div>
         <div className='img-box-3'>
            <div className={ 'rest-food-name' }>{showName ?
               _.get(restaurant, `items[2].name[${language}]`, defaultItems[2].name[`${language}`]) : ''}
            </div>
            <DishFood
               image={ _.get(restaurant, 'items[2].image.url', defaultItems[2].image) }
               width={ '100%' }
            />
         </div>
      </div>
   );

   return (
      <div className='rest-box'
         onMouseEnter={ ()=>{ setshowName(true);} }
         onMouseLeave={ ()=>{ setshowName(false);} }
         onClick={ ()=>{ dispatch(goMenu(restaurant));} }
      >
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