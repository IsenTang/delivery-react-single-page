import request from '../Common/request';
import env from '../Common/config';

/* 登录 */
export async function placeOrder (data,restId){

   const result = await request({
      url:     `${env.server}/restaurants/${restId}/orders`,
      method:  'post',
      data
   });

   return result;
}