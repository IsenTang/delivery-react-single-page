import React from 'react';

export default function (Loadable) {
   return [
      {
         name:      'login',
         path:      '/login',
         exact:     true,
         component: Loadable({
            loader:  () => import('../Views/Login/view'),
            loading: () => <div />
         })
      }
   ];
}