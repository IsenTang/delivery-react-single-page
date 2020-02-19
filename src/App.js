import React from 'react';
import _ from 'lodash';
import { Switch,Redirect } from 'react-router-dom';
import  uuidv4  from 'uuid/v4';
import intl from 'react-intl-universal';
import { useState } from 'react';
import { useMount } from 'react-use';

import PrivateRouter from './Common/priviteRouter';
import routers from './Router/index';
import { get,set } from './Common/utils';

import Loading from './Components/Loading/Loading';
import ErrorModal from './Components/Modal/Error/ErrorModal';
import Alert from './Components/Modal/Alert/Alert';
import Header from './Components/Header/Header';

const locales = {
   'en-US': require('./Common/i18n/en-US.json'),
   'zh-CN': require('./Common/i18n/zh-CN.json')
};

function App () {

   const [ initDone,setInitDone ] = useState(false);

   useMount(()=>{

      loadLocales();
   });

   function loadLocales () {

      /* init method will load CLDR locale data according to currentLocale
    react-intl-universal is singleton, so you should init it only once in your app*/
      const lang =  get('language');

      let initLang = 'zh-CN';

      if (!_.isEmpty(lang)) {
         initLang = lang;
      } else {

         /* set language to local storage */
         set('language', initLang);
      }

      intl.init({
         currentLocale: initLang,
         locales
      })
         .then(() => {

            /* After loading CLDR locale data, start to render*/
            // setInterval(()=>{
            setInitDone(true);
            // },2000);

         });
   }

   return (
      initDone ?
         <div className="App">
            <Loading/>
            <ErrorModal/>
            <Alert/>
            <Header>
               <Switch>
                  { renderRouter() }
               </Switch>
            </Header>
         </div> : <Loading showLoading={ true }/>
   );
}

function renderRouter (){

   const array = _.map(routers, (r) => (

      <PrivateRouter key={ uuidv4() } component={ r.component }
         exact={ !!r.exact }
         path={ r.path }
      />
   ));

   array.push(<Redirect key={ uuidv4() } path="*" exact={ true } to="/restaurant" />);

   return array;
}

export default App;
