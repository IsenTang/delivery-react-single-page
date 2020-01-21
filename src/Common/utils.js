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