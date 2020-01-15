import React from 'react';
import _ from 'lodash'
import { Route, Switch } from 'react-router-dom';
import  uuidv4  from 'uuid/v4';

import routers from './Router/index';


function App() {
  return (
    <div className="App">
      <Switch>
          { renderRouter() }
      </Switch>
    </div>
  );
}

function renderRouter(){

  const array = _.map(routers, (r, key) => (

    <Route key={uuidv4()} component={r.component}
      exact={!!r.exact}
      key={key}
      path={r.path}
    />
  ));

  return array;
}

export default App;
