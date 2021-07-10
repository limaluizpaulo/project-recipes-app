import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import MainFood from './pages/Foods/MainFood';
import MainDrinks from './pages/Drinks/MainDrinks';
import RecipeDetailFood from './pages/Foods/RecipeDetailFood';
import Explore from './pages/Explore';
import ExploreFood from './pages/Foods/ExploreFood';
import ExploreIngredientsDrink from './pages/Drinks/ExploreIngredientsDrink';
import ExploreIngredientsFood from './pages/Foods/ExploreIngredientsFood';
import ExploreCountry from './pages/Foods/ExploreCountry';
import Profile from './pages/Profile';
import RecipeDone from './pages/RecipeDone';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetailDrink from './pages/Drinks/RecipeDetailDrink';
import ExploreDrink from './pages/Drinks/ExploreDrink';
import RecipeProgressFood from './pages/Foods/RecipeProgressFood';
import RecipeProgressDrink from './pages/Drinks/RecipeProgressDrink';
import store from './Redux/store';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="meals">
      <BrowserRouter>
        <Provider store={ store }>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/comidas" component={ MainFood } />
            <Route exact path="/bebidas" component={ MainDrinks } />
            <Route
              exact
              path="/comidas/:id/in-progress"
              component={ RecipeProgressFood }
            />
            <Route
              exact
              path="/bebidas/:id/in-progress"
              component={ RecipeProgressDrink }
            />
            <Route exact path="/comidas/:id" component={ RecipeDetailFood } />
            <Route exact path="/bebidas/:id" component={ RecipeDetailDrink } />
            <Route exact path="/explorar" component={ Explore } />
            <Route exact path="/explorar/comidas" component={ ExploreFood } />
            <Route exact path="/explorar/bebidas" component={ ExploreDrink } />
            <Route
              exact
              path="/explorar/comidas/ingredientes"
              component={ ExploreIngredientsFood }
            />
            <Route
              exact
              path="/explorar/bebidas/ingredientes"
              component={ ExploreIngredientsDrink }
            />
            <Route exact path="/explorar/comidas/area" component={ ExploreCountry } />
            <Route exact path="/perfil" component={ Profile } />
            <Route exact path="/receitas-feitas" component={ RecipeDone } />
            <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
            <Route exact path="/explorar/bebidas/area" component={ NotFound } />
          </Switch>
        </Provider>
      </BrowserRouter>
      {/* <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object> */}
    </div>
  );
}

export default App;
