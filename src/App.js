import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Perfil from './pages/Perfil';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route path="/comidas/:comidaId" />
      <Route path="/bebidas/:bebidaId" />
      <Route path="/comidas/:comidaId/in-progress" />
      <Route path="/comidas/:bebidaId/in-progress" />
      <Route exact path="/explorar" />
      <Route exact path="/explorar/comidas" />
      <Route exact path="/explorar/bebidas" />
      <Route exact path="/explorar/comidas/ingredientes" />
      <Route exact path="/explorar/bebidas/ingredientes" />
      <Route exact path="/explorar/comidas/area" />
      <Route exact path="/perfil" component={ Perfil } />
      <Route exact path="/receitas-feitas" />
      <Route exact path="/receitas-favoritas" />
    </Switch>
  );
}

export default App;
