import request from '../Common/request';
import env from '../Common/config';

/* 登录 */
export async function placeOrderRequest (data){

   const result = await request({
      url:     `${env.server}/order`,
      method:  'put',
      data
   });

   return result;
}

/* 获取个人order信息 */
export async function loadOrder (userId){

   const result = await request({
      url:     `${env.server}/order/${userId}`,
      method:  'get'
   });

   return result;
}