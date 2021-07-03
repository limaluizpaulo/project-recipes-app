import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Food from './pages/Food';
import Drink from './pages/Drink';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import FoodIngredients from './pages/FoodIngredients';
import Profile from './pages/Profile';
import DrinkIngredients from './pages/DrinkIngredients';
import FoodOrigin from './pages/FoodOrigin';
import DoneRecipes from './pages/DoneRecepies';
import FavoritesRecipes from './pages/FavoritesRecipes';
import AuthProvider from './ContextApi/Provider';

function App() {
  return (
    <div>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Food } />
          <Route exact path="/bebidas" component={ Drink } />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/explorar/comidas" component={ ExploreFoods } />
          <Route exact path="/perfil" component={ Profile } />
          <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
          <Route exact path="/receitas-feitas" component={ DoneRecipes } />
          <Route exact path="/receitas-favoritas" component={ FavoritesRecipes } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ FoodIngredients }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ DrinkIngredients }
          />
          <Route exact path="/explorar/comidas/area" component={ FoodOrigin } />

        </Switch>
      </AuthProvider>
    </div>
  );
}

export default App;
