import * as ActionType from '../actionTypes';
import { get } from '../../Common/utils';

const initialState = { language: get('language') || 'zh-CN' };

export default (state = initialState, payload) => {

   switch (payload.type) {
   case ActionType.CHANGE_LANGUAGE:

      return {
         ...state,
         language: payload.language
      };
   default:
      return state;
   }
};