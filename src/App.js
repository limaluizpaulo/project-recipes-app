import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Pages from './pages/index';

export default function App() {
  function renderRotes() {
    return (
      <Switch>
        <Route
          path="/comidas/:Id/in-progress"
          component={ Pages.FoodRecipeByIdProgress }
        />
        <Route
          path="/comidas/:Id"
          component={ Pages.FoodAndDrinkById }
        />
        <Route
          path="/comidas"
          component={ Pages.MainPage }
        />
        <Route
          path="/bebidas/:Id/in-progress"
          component={ Pages.DrinkRecipeByIdProgress }
        />
        <Route
          path="/bebidas/:Id"
          component={ Pages.FoodAndDrinkById }
        />
        <Route
          path="/bebidas"
          component={ Pages.MainPage }
        />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ Pages.ExploreByIngredients }
        />
        <Route
          path="/explorar/comidas/area"
          component={ Pages.ExploreFoodsByLocation }
        />
        <Route
          path="/explorar/comidas"
          component={ Pages.ExploreMealsOrDrinks }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ Pages.ExploreByIngredients }
        />
        <Route
          exact
          path="/explorar/bebidas"
          component={ Pages.ExploreMealsOrDrinks }
        />
        <Route
          path="/explorar"
          component={ Pages.Explore }
        />
        <Route
          path="/perfil"
          component={ Pages.Profile }
        />
        <Route
          path="/receitas-feitas"
          component={ Pages.CookedRecipes }
        />
        <Route
          path="/receitas-favoritas"
          component={ Pages.FavoritesRecipes }
        />
        <Route
          exact
          path="/"
          component={ Pages.Login }
        />
        <Route
          path="*"
          component={ Pages.NotFound }
        />
      </Switch>
    );
  }

  return (
    <div className="meals">
      {renderRotes()}
    </div>
  );
}
