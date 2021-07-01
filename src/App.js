import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Cocktails from './common/pages/Cocktails';
import Explorer from './common/pages/Explorer';
import Login from './common/pages/Login';
import Profile from './common/pages/Profile';
import Recipes from './common/pages/Recipes';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ Recipes } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/bebidas" component={ Cocktails } />
        <Route path="/explorar" component={ Explorer } />
      </Switch>
    </Provider>
  );
}

export default App;
