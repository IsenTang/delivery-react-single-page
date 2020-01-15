import React from 'react'

export default function(Loadable) {
    return [
      {
        name:      'restaurant',
        path:      '/restaurant',
        exact:     true,
        component: Loadable({
          loader:  () => import('../Views/Restaurant/view'),
          loading: () => <div />
        })
      }
    ];
}