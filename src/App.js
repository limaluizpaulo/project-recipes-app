import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import LoginProvider from './context/LoginProvider';
import DrinksProvider from './context/DrinksProvider';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import Recipes from './pages/Recipes';

function App() {
  return (
    <LoginProvider>
      <DrinksProvider>
        <RecipesProvider>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/comidas" component={ Recipes } />
          </Switch>
        </RecipesProvider>
      </DrinksProvider>
    </LoginProvider>
  );
}

export default App;
