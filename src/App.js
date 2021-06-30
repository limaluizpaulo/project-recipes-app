import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Switch,
  Route,
  // Link,
  // useParams,
  // useRouteMatch,
} from 'react-router-dom';
import Pages from './pages/index';
import Login from './pages/Login';

// Source: https://reactrouter.com/web/example/nesting

export default function App() {
  // const { path } = useRouteMatch();
  // const { recipeId } = useParams();

  // function renderLoginPage() {
  //   return (
  //     <Pages.Login />
  //   );
  // }

  // function renderFoodsRote() {
  //   return (
  //     <>
  //       <Pages.Foods />
  //       <Link to="/comidas/:recipeId"> FoodId </Link>
  //       <Link to="/comidas/:recipeId/status"> FoodId/Status </Link>
  //       <Switch>
  //         <Route exact path={ path } />
  //         <Route path={ `${path}/comidas/:recipeId/status` } />
  //         <Route path={ `${path}/comidas/:recipeId` } />
  //       </Switch>
  //     </>
  //   );
  // }

  // function renderDrinksRote() {
  //   return (
  //     <>
  //       <Pages.Drinks />
  //       <Link to="/bebidas/:drinkId"> DrinkId </Link>
  //       <Link to="/bebidas/:drinkId/status"> DrinkId/Status </Link>
  //       <Switch>
  //         <Route exact path={ path } />
  //         <Route path={ `${path}/:drinkId/status` } />
  //         <Route path={ `${path}/:drinkId` } />
  //       </Switch>
  //     </>
  //   );
  // }

  // function renderExploreRotes() {
  //   return (
  //     <>
  //       <Pages.Explore />
  //       <Link to="/explorar/comidas"> Explore Food </Link>
  //       <Link to="explorar/comidas/area"> Explore Food Area </Link>
  //       <Link to="/explorar/comidas/ingredientes"> Food Ingredients </Link>
  //       <Link to="/explorar/bebidas/"> Explore Drinks </Link>
  //       <Link to="/explorar/bebidas/ingredientes"> Drinks Ingridients </Link>
  //       <Switch>
  //         <Route exact path={ path } />
  //         <Route exact path={ `${path}/comidas` } />
  //         <Route exact path={ `${path}/comidas/area` } />
  //         <Route exact path={ `${path}/comidas/ingredientes` } render={ <Pages.ExploreDrinksByIngredients /> } />
  //         <Route exact path={ `${path}/bebidas` } />
  //         <Route exact path={ `${path}/bebidas/ingredientes` } />
  //       </Switch>
  //     </>
  //   );
  // }

  // function renderProfileRote() {
  //   return (
  //     <Pages.Profile />
  //   );
  // }

  // function renderCookedRecipes() {
  //   return (
  //     <Pages.CookedRecipes />
  //   );
  // }

  // function renderFavoriteRecipes() {
  //   return (
  //     <Pages.FavoritesRecipes />
  //   );
  // }

  // function renderNotFoundPage() {
  //   return (
  //     <Pages.NotFound />
  //   );
  // }

  // function RenderRotes() {
  //   return (
  //     <Switch>
  //       <Route path="/comidas/:recipeId/in-progress" />
  //       <Route path="/comidas/:recipeId" />
  //       <Route path="/bebidas/:drinkId/in-progress" />
  //       <Route path="bebida/:drinkId`" />
  //       <Route path={ `${path}/comidas` } />
  //       <Route exact path={ `${path}/comidas/area` } />
  //       <Route
  //         exact
  //         path={ `${path}/comidas/ingredientes` }
  //         component={ <Pages.ExploreDrinksByIngredients /> }
  //       />
  //       <Route exact path={ `${path}/bebidas/ingredientes` } />
  //       <Route exact path={ `${path}/bebidas` } />
  //       <Route
  //         path="/comidas"
  //         component={ <Pages.Foods /> }
  //       />
  //       <Route
  //         path="/bebidas"
  //         component={ <Pages.Drinks /> }
  //       />
  //       <Route
  //         path="/explorar"
  //         component={ <Pages.Explore /> }
  //       />
  //       <Route
  //         path="/perfil"
  //         component={ <Pages.Profile /> }
  //       />
  //       <Route
  //         path="/receitas-feitas"
  //         component={ <Pages.CookedRecipes /> }
  //       />
  //       <Route
  //         path="/receitas-favoritas"
  //         component={ <Pages.FavoritesRecipes /> }
  //       />
  //       <Route
  //         exact
  //         path="/"
  //         component={ <Login /> }
  //       />

  //       <Route
  //         path="*"
  //         component={ <Pages.NotFound /> }
  //       />
  //     </Switch>
  //   );
  // }

  return (
    <div className="meals">
      <h1>Olaaaa Main Group 3!! O melhor grupo de todos!!</h1>
      <Switch>
        <Route
          path="/"
          component={ <Login /> }
        />
      </Switch>
    </div>
  );
}
