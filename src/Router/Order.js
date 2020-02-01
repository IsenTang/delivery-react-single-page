import React from 'react';

/**
 * routers
 */
export default function (Loadable) {
   return [
      {
         name:      'order',
         path:      '/order',
         exact:     true,
         component: Loadable({
            loader:  () => import('../Views/Order/view'),
            loading: () => <div />
         })
      }
   ];
}