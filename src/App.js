import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Pages from './pages/index';
// import TesteDeRotas from './components/TesteDeRotas';

export default function App() {
  function renderRotes() {
    return (
      <Switch>
        <Route
          path="/comidas/:recipeId/in-progress"
          component={ Pages.FoodRecipeByIdProgress }
        />
        <Route
          path="/comidas/:recipeId"
          component={ Pages.FoodRecipeById }
        />
        <Route
          path="/comidas"
          component={ Pages.Foods }
        />
        <Route
          path="/bebidas/:drinkId/in-progress"
          component={ Pages.DrinkRecipeByIdProgress }
        />
        <Route
          path="/bebidas/:drinkId"
          component={ Pages.DrinkRecipeById }
        />
        <Route
          path="/bebidas"
          component={ Pages.Drinks }
        />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ Pages.ExploreFoodsByIngredients }
        />
        <Route
          path="/explorar/comidas/area"
          component={ Pages.ExploreFoodsByLocation }
        />
        <Route
          path="/explorar/comidas"
          component={ Pages.ExploreFoods }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ Pages.ExploreDrinksByIngredients }
        />
        <Route
          exact
          path="/explorar/bebidas"
          component={ Pages.ExploreDrinks }
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
