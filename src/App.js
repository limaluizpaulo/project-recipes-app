import './App.css';
import { Switch, Route } from 'react-router-dom';
import React from 'react';
import {
  Login, Foods, Drinks, Food, Drink, FoodProgress, DrinkProgress,
  Search, SearchFoods, SearchDrinks, SearchFoodsIng, SearchDrinksIng,
  SearchArea, RecipesMade, FavoriteRecipes, Profile, NotFound,
} from './pages';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route
        path="/comidas/:id/in-progress"
        render={ (props) => <FoodProgress { ...props } /> }
      />
      <Route
        path="/bebidas/:id/in-progress"
        render={ (props) => <DrinkProgress { ...props } /> }
      />
      <Route path="/comidas/:id" render={ (props) => <Food { ...props } /> } />
      <Route path="/bebidas/:id" render={ (props) => <Drink { ...props } /> } />
      <Route path="/comidas" component={ Foods } />
      <Route path="/bebidas" component={ Drinks } />
      <Route path="/explorar/comidas/area" component={ SearchArea } />
      <Route path="/explorar/comidas/ingredientes" component={ SearchFoodsIng } />
      <Route path="/explorar/bebidas/ingredientes" component={ SearchDrinksIng } />
      <Route path="/explorar/comidas" component={ SearchFoods } />
      <Route exact path="/explorar/bebidas" component={ SearchDrinks } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ RecipesMade } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route exact path="/explorar" component={ Search } />
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      <Route component={ NotFound } />

    </Switch>
  );
}

export default App;
