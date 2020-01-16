import React from 'react';
import _ from 'lodash';
import { Switch,Redirect } from 'react-router-dom';
import  uuidv4  from 'uuid/v4';

import PrivateRouter from './Common/priviteRouter';
import routers from './Router/index';

import Loading from './Components/Loading/loading';

function App() {

   return (
      <div className="App">
         <Loading/>
         <Switch>
            { renderRouter() }
         </Switch>
      </div>
   );
}

function renderRouter(){

   const array = _.map(routers, (r) => (

      <PrivateRouter key={uuidv4()} component={r.component}
         exact={!!r.exact}
         path={r.path}
      />
   ));

   array.push(<Redirect key={uuidv4()} path="/" exact={true} to="/restaurant" />);

   return array;
}

export default App;
