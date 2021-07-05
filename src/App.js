import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route } from 'react-router-dom';
import Food from './pages/Food/Food';
import Provider from './Provider/provider';
import Drinks from './pages/Drinks/Drinks';
import Login from './pages/Login/Login';
import Explorar from './pages/Explore/Explore';
import ExplorerFoods from './pages/ExplorerFoods/ExplorerFoods';
import ExplorerDrinks from './pages/ExplorerDrinks/ExplorerDrinks';
import FoodIngredients from './pages/FoodIngredients/FoodIngredients';
import DrinkIngredients from './pages/DrinkIngredients/DrinkIngredients';
import DetalhesComidas from './pages/Detalhes/DetalhesComidas';
import DetalhesBebidas from './pages/Detalhes/DetalhesBebidas';
import ExploreFoodOrigin from './pages/ExploreFoodOrigin/ExploreFoodOrigin';
import Profile from './pages/Profile/Profile';
import RecipesMade from './pages/RecipesMade/RecipesMade';
import RecipesFavorites from './pages/RecipesFavorites/RecipesFavorites';

const test = '';
function App() {
  return (
    <Provider>
      <Router>
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/comidas" exact component={ Food } />
          <Route path="/comidas/:id" exact component={ DetalhesComidas } />
          <Route path="/comidas/:id/in-progress" exact component={ test } />
          <Route path="/bebidas" exact component={ Drinks } />
          <Route path="/bebidas/:id" exact component={ DetalhesBebidas } />
          <Route path="/bebidas/:id/in-progress" exact component={ test } />
          <Route path="/explorar" exact component={ Explorar } />
          <Route path="/explorar/comidas" exact component={ ExplorerFoods } />
          <Route path="/explorar/bebidas" exact component={ ExplorerDrinks } />
          <Route
            path="/explorar/comidas/ingredientes"
            exact
            component={ FoodIngredients }
          />
          <Route
            path="/explorar/bebidas/ingredientes"
            exact
            component={ DrinkIngredients }
          />
          <Route path="/explorar/comidas/area" exact component={ ExploreFoodOrigin } />
          <Route path="/perfil" exact component={ Profile } />
          <Route path="/receitas-feitas" exact component={ RecipesMade } />
          <Route path="/receitas-favoritas" exact component={ RecipesFavorites } />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
