import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Meal from './pages/Meal';
import Drink from './pages/Drink';
import MealsInProgress from './pages/MealsInProgress';
import DrinksInProgress from './pages/DrinksInProgress';
import Explore from './pages/Explore';
import ExploreMeals from './pages/ExploreMeals';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreMealsByIngredient from './pages/ExploreMealsByIngredient';
import ExploreDrinksByIngredient from './pages/ExploreDrinksByIngredient';
import ExploreMealsByOrigin from './pages/ExploreMealsByOrigin';
import Profile from './pages/Profile';
import RecipesMade from './pages/RecipesMade';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Meals } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/comidas/:id" component={ Meal } />
      <Route exact path="/bebidas/:id" component={ Drink } />
      <Route exact path="/comidas/:id/in-progress" component={ MealsInProgress } />
      <Route exact path="/bebidas/:id/in-progress" component={ DrinksInProgress } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreMeals } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreMealsByIngredient }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinksByIngredient }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreMealsByOrigin } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ RecipesMade } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
