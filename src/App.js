import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/comidas/:comidaId" component={ FoodDetails } />
      <Route exact path="/bebidas/:bebidaId" component={ DrinkDetails } />
      <Route exact path="/comidas/:comidaId/in-progress" />
      <Route exact path="/comidas/:bebidaId/in-progress" />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route exact path="/explorar/comidas/ingredientes" component={ ExploreFoodsIngredients } />
      <Route exact path="/explorar/bebidas/ingredientes" component={ ExploreDrinksIngredients } />
      <Route exact path="/explorar/comidas/area" component={ ExploreFoods } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
