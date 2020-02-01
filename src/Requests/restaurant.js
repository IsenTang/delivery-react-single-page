import request from '../Common/request';
import env from '../Common/config';

/* 获取所有餐馆 */
export async function loadRestaurant (){

   const result = await request({
      url:     `${env.server}/restaurant/location/-74.0059413,40.7127837`,
      method:  'get'
   });

   return result;
}