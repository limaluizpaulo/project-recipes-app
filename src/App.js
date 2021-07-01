import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeProvider from './context/RecipeProvider';
import RecipeDetailProvider from './context/RecipeDetailProvider';
import Login from './pages/Login';
import Food from './pages/Food';
import Drink from './pages/Drink';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavouritesRecipes from './pages/FavouritesRecipes';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import FoodIngredients from './pages/FoodIngredients';
import DrinkIngredients from './pages/DrinkIngredients';
import FoodOrigin from './pages/FoodOrigin';
import DetailMeal from './pages/DetailMeal';
import DetailDrink from './pages/DetailDrink';

function App() {
  return (
    <div>
      <RecipeProvider>
        <RecipeDetailProvider>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/comidas" component={ Food } />
            <Route exact path="/bebidas" component={ Drink } />
            <Route path="/comidas/:id" component={ DetailMeal } />
            <Route path="/bebidas/:id" component={ DetailDrink } />
            <Route exact path="/perfil" component={ Profile } />
            <Route exact path="/receitas-feitas" component={ DoneRecipes } />
            <Route exact path="/receitas-favoritas" component={ FavouritesRecipes } />
            <Route exact path="/explorar" component={ Explore } />
            <Route exact path="/explorar/comidas" component={ ExploreFoods } />
            <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
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
            <Route path="/explorar/comidas/area" component={ FoodOrigin } />
          </Switch>
        </RecipeDetailProvider>
      </RecipeProvider>
    </div>
  );
}

export default App;
