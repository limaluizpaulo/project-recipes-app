import { Route, Switch } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/Login';
import Food from './pages/Food';
import Beverages from './pages/Beverages';
import FoodRecipe from './pages/FoodRecipe';
import BeverageRecipe from './pages/BeverageRecipe';
import FoodInProgress from './pages/FoodInProgress';
import BeveragesInProgress from './pages/BeveragesInProgress';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreBeverages from './pages/ExploreBeverages';
import FoodIngredients from './pages/FoodIngredients';
import BeverageIngredients from './pages/BeverageIngredients';
import FoodByOrigin from './pages/FoodByOrigin';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Food } />
      <Route exact path="/bebidas" component={ Beverages } />
      <Route
        exact
        path="/comidas/:id"
        render={ (props) => <FoodRecipe { ...props } /> }
      />
      <Route exact path="/bebidas/:id" component={ BeverageRecipe } />
      <Route path="/comidas/:id/in-progress" component={ FoodInProgress } />
      <Route path="/bebidas/:id/in-progress" component={ BeveragesInProgress } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFood } />
      <Route exact path="/explorar/bebidas" component={ ExploreBeverages } />
      <Route path="/explorar/comidas/ingredientes" component={ FoodIngredients } />
      <Route path="/explorar/bebidas/ingredientes" component={ BeverageIngredients } />
      <Route path="/explorar/comidas/area" component={ FoodByOrigin } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route path="" component={ NotFound } />
    </Switch>
  );
}

export default App;
