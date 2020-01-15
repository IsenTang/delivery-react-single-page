import request from '../Common/request';
import env from '../Common/config';

/* 登录 */
export async function login(){

   const result = await request({
      url:     `${env.server}`,
      method:  'post',
   });
    
   return result;
}