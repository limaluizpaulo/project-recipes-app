import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './common/pages/Login';
import Recipes from './common/pages/Recipes';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ Recipes } />
      </Switch>

    </Provider>
  );
}

export default App;
