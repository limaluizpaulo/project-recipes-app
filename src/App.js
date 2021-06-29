import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Explore from './pages/Explore';
import ExploreMeals from './pages/ExploreMeals';
import ExploreDrinks from './pages/ExploreDrinks';
import MealsByIngre from './pages/MealsByIngre';
import DrinksByIngre from './pages/DrinksByIngre';
import ExploreByArea from './pages/ExploreByArea';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import Favorites from './pages/Favorites';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Recipes } />
        <Route exact path="/bebidas" component={ Recipes } />
        <Route exact path="/comidas/:id" component={ RecipeDetails } />
        <Route exact path="/bebidas/:id" component={ RecipeDetails } />
        <Route exact path="/comidas/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreMeals } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route exact path="/explorar/comidas/ingredientes" component={ MealsByIngre } />
        <Route exact path="/explorar/bebidas/ingredientes" component={ DrinksByIngre } />
        <Route exact path="/explorar/comidas/area" component={ ExploreByArea } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ DoneRecipes } />
        <Route exact path="/receitas-favoritas" component={ Favorites } />
      </Switch>
    </div>
  );
}

export default App;
