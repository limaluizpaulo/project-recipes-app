import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Meals from './pages/Meals';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Meals } />
    </Switch>
  );
}

export default App;
