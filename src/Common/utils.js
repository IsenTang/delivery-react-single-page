import _ from 'lodash';
import intl from 'react-intl-universal';

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

/**
 * Translate filter
 */
export function lang (name, params, fallback) {
   const localeOptions = intl.getInitOptions();
   const currentLocale = localeOptions.currentLocale || 'en-US';

   /* Return '' if no name */
   if (_.isEmpty(name)) {
      return '';
   }

   /* Langs pre-defined objects */
   if (_.isObject(name)) {
      return _.get(name, currentLocale) || _.get(name, 'zh-CN') || name;
   }

   return intl.get(name, params) || fallback;
}

/**
  * get current lang
  */
export function getCurrentLang () {
   const localeOptions = intl.getInitOptions();
   const currentLocale = localeOptions.currentLocale || 'en-US';

   return currentLocale;
}

/* 格式化价格 */
export function formatPrice (num,toFixed){

   /* Default Fixed to 2, toFixed can be 0 or null */
   if (_.isEmpty(toFixed) && toFixed !== 0 && toFixed !== null) {
      toFixed = 2;
   }

   /* Get the number string */
   num = Number(num) || 0;

   /* Get average number */
   let n = Math.abs(num) / 100;

   /* check if finite number */
   if (_.isFinite(toFixed)) {
      n = n.toFixed(toFixed);
   }

   /* Get currency */
   const p = `$${n}`;

   // /* Add () for negative */
   // if (num < 0) {
   //    return `(${p})`;
   // }

   return p;
}