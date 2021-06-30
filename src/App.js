import React from 'react';
import { Route, Switch } from 'react-router';

import Login from './pages/Login';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrinks from './pages/ExploreDrinks';
import RecipesProvider from './context/RecipesProvider';

import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/explorar" component={ Login } />
        <Route exact path="/" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreFood } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
