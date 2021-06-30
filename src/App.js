import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';

import RecipesProvider from './context/RecipesProvider';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import FoodList from './pages/FoodList';
import Footer from './components/Footer';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ FoodList } />
      </Switch>
      <Footer />
    </RecipesProvider>
  );
}

export default App;
