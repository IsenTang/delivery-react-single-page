import request from '../Common/request';
import env from '../Common/config';

/* 登录 */
export async function loadMenu ({ restaurantId }){

   const result = await request({
      url:     `${env.server}/menu/restaurantId/${restaurantId}`,
      method:  'get'
   });

   return result;
}