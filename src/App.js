import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Comidas from './Pages/Comidas';
import ReceitasFeitas from './Pages/ReceitasFeitas';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Comidas } />
      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
    </Switch>
  );
}

export default App;
