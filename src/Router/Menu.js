import React from 'react';

/**
 * routers
 */
export default function (Loadable) {
   return [
      {
         name:      'menu',
         path:      '/menu/:restId',
         exact:     true,
         component: Loadable({
            loader:  () => import('../Views/Menu/view'),
            loading: () => <div />
         })
      }
   ];
}