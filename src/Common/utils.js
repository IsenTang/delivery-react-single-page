import _ from 'lodash';

/* localstorage get */
export function get (data){
   const result = localStorage.getItem(data);

   try {
      return JSON.parse(result);
   } catch (e) {
      return result;
   }
}

/* localstorage set */
export function set (name, data){

   localStorage.setItem(name, JSON.stringify(data));
}

/* 获取对应语言信息 */
export function getLanguageInfo (item,property){

   const language = get('language');
   return _.get(item,`${property}[${language}]`);
}