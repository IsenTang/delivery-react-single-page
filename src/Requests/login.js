import request from '../Common/request';
import env from '../Common/config';

/* 登录 */
export async function checkLogin (data){

   const result = await request({
      url:     `${env.server}/user/login`,
      method:  'post',
      data
   });

   return result;
}

export async function register (data){

   const result = await request({
      url:     `${env.server}/user/register`,
      method:  'post',
      data
   });

   return result;
}