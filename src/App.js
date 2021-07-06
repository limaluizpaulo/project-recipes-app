import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Login, Meals, Drinks, Done,
  Favorites, Profile, Explore, ExploreMeals, ExploreDrinks,
  MealsDetails, MealsByIngredients, DrinksDetails, DrinksByIngredients,
  MealsByArea } from './pages';

// import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/explorar/comidas/ingredientes" component={ MealsByIngredients } />
      <Route path="/explorar/bebidas/ingredientes" component={ DrinksByIngredients } />
      <Route path="/explorar/comidas/area" component={ MealsByArea } />
      <Route path="/explorar/comidas" component={ ExploreMeals } />
      <Route path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route path="/comidas/:id" component={ MealsDetails } />
      <Route path="/bebidas/:id" component={ DrinksDetails } />
      <Route path="/comidas" component={ Meals } />
      <Route path="/bebidas" component={ Drinks } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ Done } />
      <Route path="/receitas-favoritas" component={ Favorites } />

      {/*
      <Route exact path="/comidas/:id/in-progress" component={} />
        <Route exact path="/bebidas/:id/in-progress" component={} />
        */}

    </Switch>
  );
}

export default App;
