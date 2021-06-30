import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Switch,
  Route,
  Link,
  // useParams,
  useRouteMatch,
} from 'react-router-dom';
import Pages from './pages/index';

// Source: https://reactrouter.com/web/example/nesting

export default function App() {
  const { path } = useRouteMatch();
  // const { recipeId } = useParams();

  function renderLoginPage() {
    return (
      <Pages.Login />
    );
  }

  function renderFoodsRote() {
    return (
      <>
        <Link to="/:recipeId"> FoodId </Link>
        <Link to="/:recipeId/status"> FoodId/Status </Link>
        <Switch>
          <Route exact path={ path }>
            <Pages.Foods />
          </Route>
          <Route exact path={ `${path}/:recipeId` } />
          <Route path={ `${path}/:recipeId/status` } />
        </Switch>
      </>
    );
  }

  function renderDrinksRote() {
    return (
      <>
        <Link to="/:drinkId"> DrinkId </Link>
        <Link to="/:drinkId/status"> DrinkId/Status </Link>
        <Switch>
          <Route exact path={ path }>
            <Pages.Drinks />
          </Route>
          <Route exact path={ `${path}/:drinkId` } />
          <Route path={ `${path}/:drinkId/status` } />
        </Switch>
      </>
    );
  }

  function renderExploreRotes() {
    return (
      <>
        <Link to="/explorar/comidas"> Explore Food </Link>
        <Link to="explorar/comidas/area"> Explore Food Area </Link>
        <Link to="/explorar/comidas/ingredientes"> Food Ingredients </Link>
        <Link to="/explorar/bebidas/"> Explore Drinks </Link>
        <Link to="/explorar/bebidas/ingredientes"> Drinks Ingridients </Link>
        <Switch>
          <Route exact path={ path }>
            <Pages.Explore />
          </Route>
          <Route exact path={ `${path}/comidas` } />
          <Route exact path={ `${path}/comidas/area` } />
          <Route exact path={ `${path}/comidas/ingredientes` } />
          <Route exact path={ `${path}/bebidas` } />
          <Route exact path={ `${path}/bebidas/ingredientes` } />
        </Switch>
      </>
    );
  }

  function renderProfileRote() {
    return (
      <Pages.Profile />
    );
  }

  function renderCookedRecipes() {
    return (
      <Pages.CookedRecipes />
    );
  }

  function renderFavoriteRecipes() {
    return (
      <Pages.FavoritesRecipes />
    );
  }

  function renderNotFoundPage() {
    return (
      <Pages.NotFound />
    );
  }

  function renderRotes() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ renderLoginPage }
        />
        <Route
          exact
          path="/comidas"
          render={ renderFoodsRote }
        />
        <Route
          exact
          path="/bebidas"
          render={ renderDrinksRote }
        />
        <Route
          exact
          path="/explorar"
          render={ renderExploreRotes }
        />
        <Route
          path="/perfil"
          render={ renderProfileRote }
        />
        <Route
          path="/receitas-feitas"
          render={ renderCookedRecipes }
        />
        <Route
          path="/receitas-favoritas"
          render={ renderFavoriteRecipes }
        />
        <Route
          render={ renderNotFoundPage }
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
