import _ from 'lodash';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { get } from './utils';

/* 用户在未登录的情况下可以看餐馆信息 */
/**
 * private route
 */
const PrivateRouter = ({ component: Component, ...rest }) => {

   /* get user from local storage */
   const user = get('user');

   const token = _.get(user, 'token');

   /* if token exist , it is login  */
   const isAuthenticated = !_.isEmpty(token);

   let flag = true;
   let redirectAddress = '/login';

   /* if path = login , if isAuth , directly go to the restaurant page */
   /* else go to the login page  */
   if (rest.path === '/login') {
      if (isAuthenticated) {
         flag = false;
         redirectAddress = '/restaurant';
      }

      /* if path != login , if isAuth , directly go to the exactly page */
   }

   return (
      <Route { ...rest } render={ (props) => (
         flag  ?
            <Component { ...props } /> :
            <Redirect to={ redirectAddress } />
      ) } />
   );
};

PrivateRouter.propTypes = {
   component: PropTypes.any
};

export default PrivateRouter;
