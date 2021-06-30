import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import MainFood from './pages/MainFood';
import MainDrink from './pages/MainDrink';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import ExploreFoods from './pages/ExploreFoods';
import FoodIngredients from './pages/FoodIngredients';
import ExploreDrinks from './pages/ExploreDrinks';
import DrinkIngredients from './pages/DrinkIngredients';
import FoodArea from './pages/FoodArea';
import DoneRecipes from './pages/DoneRecipes';
import FavoritesRecipes from './pages/FavoritesRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route
        exact
        path="/comidas"
        component={ MainFood }
      />
      <Route
        exact
        path="/bebidas"
        component={ MainDrink }
      />
      <Route
        path="/perfil"
        component={ Profile }
      />
      <Route
        exact
        path="/explorar"
        component={ Explore }
      />
      <Route
        exact
        path="/explorar/comidas"
        component={ ExploreFoods }
      />
      <Route
        exact
        path="/explorar/bebidas"
        component={ ExploreDrinks }
      />
      <Route
        path="/explorar/comidas/:recipeId"
        component={ FoodIngredients }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ DrinkIngredients }
      />
      <Route
        path="/explorar/comidas/area"
        component={ FoodArea }
      />
      <Route
        path="/receitas-feitas"
        component={ DoneRecipes }
      />
      <Route
        path="/receitas-favoritas"
        component={ FavoritesRecipes }
      />
    </Switch>
  );
}

export default App;
