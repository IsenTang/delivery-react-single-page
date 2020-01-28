import _ from 'lodash';
import moment from 'moment-timezone';

import { lang } from '../../../Common/utils';

/* 检查餐馆是否关门 */
export function checkRestaurantClosed (restaurant) {

   const closed = _.get(restaurant, 'closed', null);

   /* if manually set closed */
   if (closed !== null) {
      return false;
   }

   const timezone = _.get(restaurant, 'timezone');

   /* 获取当地时间 */
   const localTime = moment().tz(timezone).hours() *
    60 + moment().tz(timezone).minutes();

   const dayOfWeek = moment().tz(timezone).isoWeekday();

   const index = dayOfWeek - 1;

   const restaurantTime = _.get(restaurant, `hours[${index}]`);

   /* 开始时间 */
   const start = _.get(restaurantTime, 'start');

   /* 结束时间 */
   const end = _.get(restaurantTime, 'end');

   /* 如果当地时间比结束时间晚，或者当地时间比开始时间早，意味着关门 */
   if (localTime > end || localTime < start) {

      return false;
   }

   return true;

}

/* 渲染餐馆tag */
export function renderTags (restaurant) {

   const tags = _.get(restaurant, 'tags');
   let str = '';

   _.forEach(tags, (tag) => {
      str += `${lang(`tags.${tag}`, {}, '')} `;
   });

   return str;

}