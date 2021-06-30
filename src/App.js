import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import RecipesProvider from './context/RecipesProvider';

import './App.css';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
