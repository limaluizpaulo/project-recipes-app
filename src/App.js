import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Food from './pages/Food';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Food } />

      </Switch>

    </div>
  );
}

export default App;
