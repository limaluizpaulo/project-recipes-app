import React from 'react';
import { Route, Switch, useLocation } from 'react-router';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import RecipesProvider from './context/RecipesProvider';

import Login from './pages/Login';
import Explore from './pages/Explore';
import ExploreMeals from './pages/ExploreMeals';
import ExploreDrinks from './pages/ExploreDrinks';
import FoodList from './pages/FoodList';

import Header from './components/Header';
import Footer from './components/Footer';

import {
  allowedHeaderPathRender,
  allowedFooterPathRender,
} from './services/pathLocationNames';

function App() {
  const location = useLocation();

  const verifyAllowanceToRenderHeader = () => {
    const shouldRenderHeader = allowedHeaderPathRender.some(
      (element) => element === location.pathname,
    );
    return shouldRenderHeader ? <Header /> : null;
  };

  const verifyAllowanceToRenderFooter = () => {
    const shouldRenderFooter = allowedFooterPathRender.some(
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
      </Switch>
      { verifyAllowanceToRenderFooter() }
    </RecipesProvider>
  );
}

export default App;
