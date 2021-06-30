import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import RecipesProvider from './context/RecipesProvider';

import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import FoodList from './pages/FoodList';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ FoodList } />
        {/* <Route exact path="/carteira" component={ Wallet } /> */}
      </Switch>
    </RecipesProvider>
  );
}

export default App;
