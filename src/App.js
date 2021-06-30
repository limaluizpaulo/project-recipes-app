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
import FavouritesRecipes from './pages/FavouritesRecepes';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Food } />
        <Route exact path="/bebidas" component={ Drink } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreFoods } />
        <Route path="/perfil" component={ Profile } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route path="/receitas-feitas" component={ DoneRecipes } />
        <Route path="/receitas-favoritas" component={ FavouritesRecipes } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ FoodIngredients }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ DrinkIngredients }
        />
        <Route path="/explorar/comidas/area" component={ FoodOrigin } />

      </Switch>

    </div>
  );
}

export default App;
