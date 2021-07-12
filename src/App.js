import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Explorer from './common/pages/Explorer';
import RecipeDetails from './common/pages/RecipeDetails';
import RecipeInProgress from './common/pages/RecipeInProgress';
import DoneRecipes from './common/pages/DoneRecipes';
import Login from './common/pages/Login';
import Profile from './common/pages/Profile';
import Recipes from './common/pages/Recipes';
import Provider from './context/Provider';
import FavoriteRecipes from './common/pages/FavoriteRecipes';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Recipes } />
        <Route exact path="/bebidas" component={ Recipes } />
        <Route exact path="/comidas/:id" component={ RecipeDetails } />
        <Route exact path="/bebidas/:id" component={ RecipeDetails } />
        <Route path="/comidas/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/receitas-feitas" component={ DoneRecipes } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/explorar" component={ Explorer } />
      </Switch>
    </Provider>
  );
}

export default App;
