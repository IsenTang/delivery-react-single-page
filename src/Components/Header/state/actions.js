import intl from 'react-intl-universal';
import { push } from 'connected-react-router';

import * as ActionType from '../../../Redux/actionTypes';
import { set } from '../../../Common/utils';

const locales = {
   'en-US': require('../../../Common/i18n/en-US.json'),
   'zh-CN': require('../../../Common/i18n/zh-CN.json')
};

/* 修改语言 */
export function changeLanguage (language){

   return async (dispatch) => {

      dispatch({ type:    ActionType.CHANGE_LANGUAGE,language });
      /* set i18n local language*/
      intl.init({
         currentLocale: language,
         locales
      });

      set('language',language);
   };

}

/* 去order页面 */
export function goOrder (){

   return async (dispatch) => {

      dispatch(push('/order'));
   };

}