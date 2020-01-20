import request from '../Common/request';
import env from '../Common/config';

/* 登录 */
export async function loadRestaurant (){

   const result = await request({
      url:     `${env.server}/restaurant/location/-74.0059413,40.7127837`,
      method:  'get'
   });

   return result;
}