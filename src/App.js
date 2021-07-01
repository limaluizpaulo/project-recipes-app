import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipeDetails from './common/components/RecipeDetails';
import Login from './common/pages/Login';
import Profile from './common/pages/Profile';
import Recipes from './common/pages/Recipes';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Recipes } />
        <Route exact path="/bebidas" component={ Recipes } />
        <Route path="/comidas/:id" component={ RecipeDetails } />
        <Route path="/perfil" component={ Profile } />
      </Switch>
    </Provider>
  );
}

export default App;
