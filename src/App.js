import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Comidas from './Pages/Comidas';
import Perfil from './Pages/Perfil';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Comidas } />
      <Route exact path="/perfil" component={ Perfil } />
    </Switch>
  );
}

export default App;
