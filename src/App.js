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
        <Route path="/comidas/:recipeId/in-progress" />
        <Route path="/comidas/:recipeId" />
        <Route
          path="/comidas"
          component={ Pages.Foods }
        />
        <Route path="/bebidas/:drinkId/in-progress" />
        <Route path="/bebidas/:drinkId" />
        <Route
          path="/bebidas"
          component={ Pages.Drinks }
        />
        <Route
          path="/explorar/comidas"
          component={ Pages.ExploreFoods }
        />
        <Route
          path="explorar/comidas/area"
          component={ Pages.ExploreFoodsByLocation }
        />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ Pages.ExploreFoodsByIngredients }
        />
        <Route
          path="/explorar/bebidas/"
          component={ Pages.ExploreDrinks }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ Pages.ExploreDrinksByIngredients }
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
      <h1>Olaaaa Main Group 3!! O melhor grupo de todos!!</h1>
      {renderRotes()}
    </div>
  );
}
