import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import {
  Login, Foods, Drinks, Food, Drink, FoodProgress, DrinkProgress,
  Search, SearchFoods, SearchDrinks, SearchFoodsIng, SearchDrinksIng,
  SearchArea, RecipesMade, FavoriteRecipes, Profile,
} from './pages';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      <Route path="/comidas" component={ Foods } />
      <Route path="/bebidas" component={ Drinks } />
      <Route path="/comidas/:id" render={ (props) => <Food { ...props } /> } />
      <Route path="/bebidas/:id" render={ (props) => <Drink { ...props } /> } />
      <Route
        path="/comidas/:id/in-progress"
        render={ (props) => <FoodProgress { ...props } /> }
      />
      <Route
        path="/bebidas/:id/in-progress"
        render={ (props) => <DrinkProgress { ...props } /> }
      />
      <Route path="/explorar" component={ Search } />
      <Route path="/explorar/comidas" component={ SearchFoods } />
      <Route path="/explorar/bebidas" component={ SearchDrinks } />
      <Route path="/explorar/comidas/ingredientes" component={ SearchFoodsIng } />
      <Route path="/explorar/bebidas/ingredientes" component={ SearchDrinksIng } />
      <Route path="/explorar/comidas/area" component={ SearchArea } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ RecipesMade } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
