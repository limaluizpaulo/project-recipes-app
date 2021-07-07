import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Login,
  Meals,
  Drinks,
  Done,
  Favorites,
  Profile,
  Explore,
  ExploreMeals,
  ExploreDrinks,
  MealsDetails,
  MealsByIngredients,
  DrinksDetails,
  DrinksByIngredients,
  MealsByArea,
  NotFound,
} from './pages';

// import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ MealsByIngredients }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ DrinksByIngredients }
      />
      <Route exact path="/explorar/comidas/area" component={ MealsByArea } />
      <Route exact path="/explorar/comidas" component={ ExploreMeals } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route exact path="/comidas/:id" component={ MealsDetails } />
      <Route exact path="/bebidas/:id" component={ DrinksDetails } />
      <Route exact path="/comidas" component={ Meals } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ Done } />
      <Route exact path="/receitas-favoritas" component={ Favorites } />
      <Route exact path="/" component={ Login } />
      <Route component={ NotFound } />
      {/*
      <Route exact path="/comidas/:id/in-progress" component={} />
        <Route exact path="/bebidas/:id/in-progress" component={} />
        */}
    </Switch>
  );
}

export default App;
