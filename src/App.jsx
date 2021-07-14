import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Login,
  MainPage,
  RecipeInProgress,
  FoodDetails,
  DoneRecipes,
  Profile,
  Explore,
  ExploreMealsOrDrinks,
  Ingredients,
  ExploreArea,
  FavoriteRecipes,
} from './pages';
import { NotFound } from './components';

function App() {
  return (
    <Switch>
      <Route exact path="/comidas/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/explorar/comidas/ingredientes" component={ Ingredients } />
      <Route exact path="/explorar/bebidas/ingredientes" component={ Ingredients } />
      <Route exact path="/explorar/bebidas/area" component={ NotFound } />
      <Route exact path="/explorar/comidas/area" component={ ExploreArea } />
      <Route exact path="/explorar/comidas" component={ ExploreMealsOrDrinks } />
      <Route exact path="/explorar/bebidas" component={ ExploreMealsOrDrinks } />
      <Route exact path="/bebidas/:id" component={ FoodDetails } />
      <Route exact path="/comidas/:id" component={ FoodDetails } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route exact path="/receitas-feitas" component={ DoneRecipes } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/comidas" component={ MainPage } />
      <Route exact path="/bebidas" component={ MainPage } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
