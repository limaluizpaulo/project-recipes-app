import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Switch, Route } from 'react-router-dom';

import Pages from './pages/index';

// Source: https://reactrouter.com/web/example/nesting

export default function App() {
  function renderMainPagesChilds() {
    return (
      <Switch>
        <Route path="/bebidas/:id/in-progress" render={ () => <Pages.InProgress /> } />
        <Route path="/comidas/:id/in-progress" render={ () => <Pages.InProgress /> } />
        <Route path="/bebidas/:id" render={ () => <Pages.Details /> } />
        <Route path="/comidas/:id" render={ () => <Pages.Details /> } />
        <Route path="/bebidas" render={ () => <Pages.MainPage /> } />
        <Route path="/comidas" render={ () => <Pages.MainPage /> } />
      </Switch>
    );
  }

  function renderExploreChilds() {
    return (
      <Switch>
        <Route
          path="/explorar/bebidas/area"
          render={ () => <Pages.NotFound /> }
        />
        <Route
          path="/explorar/comidas/area"
          render={ () => <Pages.ExploreArea /> }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          render={ () => <Pages.ExploreByIngridients /> }
        />
        <Route
          path="/explorar/comidas/ingredientes"
          render={ () => <Pages.ExploreByIngridients /> }
        />
        <Route
          path="/explorar/comidas"
          render={ () => <Pages.ExploreMealsOrDrinks /> }
        />
        <Route
          path="/explorar/bebidas"
          render={ () => <Pages.ExploreMealsOrDrinks /> }
        />
        <Route path="/explorar" render={ () => <Pages.Explore /> } />
      </Switch>
    );
  }

  function renderMotherRotes() {
    return (
      <Switch>
        <Route
          path="/comidas"
          render={ renderMainPagesChilds }
        />
        <Route
          path="/bebidas"
          render={ renderMainPagesChilds }
        />
        <Route
          path="/explorar"
          render={ renderExploreChilds }
        />
        <Route
          path="/perfil"
          render={ () => <Pages.Profile /> }
        />
        <Route
          path="/receitas-feitas"
          render={ () => <Pages.DoneRecipes /> }
        />
        <Route
          path="/receitas-favoritas"
          render={ () => <Pages.FavoritesRecipes /> }
        />
        <Route
          exact
          path="/"
          render={ () => <Pages.Login /> }
        />
        <Route
          path="*"
          render={ () => <Pages.NotFound /> }
        />
      </Switch>
    );
  }

  return (
    <div className="meals">
      {renderMotherRotes()}
    </div>
  );
}
