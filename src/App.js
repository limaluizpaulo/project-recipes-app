import React from 'react';
import { Route, Switch, useLocation } from 'react-router';

import Login from './pages/Login';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import IngredientDrink from './pages/IngredientDrink';
import IngredientMeals from './pages/IngredientMeals';
import RecipesProvider from './context/RecipesProvider';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExploreMeals from './pages/ExploreMeals';
import FoodList from './pages/FoodList';

import Header from './components/Header';
import Footer from './components/Footer';

import {
  allowedHeaderRenderByPath,
  allowedFooterRenderByPath,
} from './services/AllowanceToRender';

function App() {
  const location = useLocation();

  const verifyAllowanceToRenderHeader = () => {
    const shouldRenderHeader = allowedHeaderRenderByPath.some(
      (element) => element === location.pathname,
    );
    return shouldRenderHeader ? <Header /> : null;
  };

  const verifyAllowanceToRenderFooter = () => {
    const shouldRenderFooter = allowedFooterRenderByPath.some(
      (element) => element === location.pathname,
    );
    return shouldRenderFooter ? <Footer /> : null;
  };

  return (
    <RecipesProvider>
      { verifyAllowanceToRenderHeader() }
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ FoodList } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreMeals } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ IngredientMeals }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ IngredientDrink }
        />
        <Route exact path="/comidas" component={ FoodList } />
      </Switch>
      { verifyAllowanceToRenderFooter() }
    </RecipesProvider>
  );
}

export default App;
