import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import Provider from './context';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Login, Meals, Drinks, Done,
  Favorites, Profile, Explore, ExploreMeals, ExploreDrinks,
  MealsDetails, MealsByIngredients, DrinksDetails, DrinksByIngredients,
  MealsByArea, Done } from './pages';

// import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <Switch>
      <Provider>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Meals } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/explorar" component={ Explore } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/explorar/comidas" component={ ExploreMeals } />
        <Route path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route exact path="/comidas/:id" component={ MealsDetails } />
        <Route exact path="/bebidas/:id" component={ DrinksDetails } />
        <Route path="/explorar/comidas/ingredientes" component={ MealsByIngredients } />
        <Route path="/explorar/bebidas/ingredientes" component={ DrinksByIngredients } />
        <Route path="/explorar/comidas/area" component={ MealsByArea } />
        <Route path="/receitas-feitas" component={ Done } />
         <Route path="/receitas-favoritas" component={ Favorites } />

        { /* <Route exact path="/comidas/:id/in-progress" component={} />
        <Route exact path="/bebidas/:id/in-progress" component={} />
        <Route path="/receitas-favoritas" component={} /> */}

      </Provider>
    </Switch>
  );
}

export default App;
