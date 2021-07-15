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
import FoodInProgress from './pages/FoodInProgress';
import ExploreDrinks from './pages/ExploreDrinks';
import FoodArea from './pages/FoodArea';
import DoneRecipes from './pages/DoneRecipes';
import FavoritesRecipes from './pages/FavoritesRecipes';
import ExploreMealsIngredients from './pages/ExploreMealIngredients';
import ExploreDrinksIngredients from './pages/ExploreDrinkIngredients';
import NotFound from './pages/NotFound';

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
        path="/explorar/comidas/ingredientes"
        component={ ExploreMealsIngredients }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinksIngredients }
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
        exact
        path="/bebidas/:recipeId/in-progress"
        component={ FoodInProgress }
      />
      <Route
        exact
        path="/comidas/:recipeId/in-progress"
        component={ FoodInProgress }
      />
      <Route
        path="/bebidas/:recipeId"
        component={ FoodIngredients }
      />
      <Route
        path="/comidas/:recipeId"
        component={ FoodIngredients }
      />
      <Route
        exact
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
      <Route
        path="/explorar/bebidas/area"
        component={ NotFound }
      />
    </Switch>
  );
}

export default App;
