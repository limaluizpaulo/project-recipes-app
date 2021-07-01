import React from 'react';
import { Route, Switch } from 'react-router';

import Login from './pages/Login';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrinks from './pages/ExploreDrinks';
import IngredientDrink from './pages/IngredientDrink';
import IngredientFood from './pages/IngredientFood';
import RecipesProvider from './context/RecipesProvider';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import FoodList from './pages/FoodList';
import Footer from './components/Footer';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreFood } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route exact path="/explorar/comidas/ingredientes" component={ IngredientFood } />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ IngredientDrink }
        />
        <Route exact path="/comidas" component={ FoodList } />
      </Switch>
      <Footer />
    </RecipesProvider>
  );
}

export default App;
