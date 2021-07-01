import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Comidas from './pages/Comidas';
import Perfil from './pages/Perfil';

function App() {
  return (
    <Switch>

      <Route path="/explorar/comidas/area" component="a" />
      <Route path="/explorar/bebidas/ingredientes" component="a" />
      <Route path="/explorar/comidas/ingredientes" component="a" />
      <Route path="/comidas/:id/in-progress" component="a" />
      <Route path="/bebidas/:id/in-progress" component="a" />
      <Route path="/explorar/comidas" component="a" />
      <Route path="/explorar/bebidas" component="a" />
      <Route path="/comidas/:id" component="a" />
      <Route path="/bebidas/:id" component="a" />
      <Route path="/receitas-feitas" component="a" />
      <Route path="/receitas-favoritas" component="a" />
      <Route path="/explorar" component="a" />
      <Route path="/perfil" component={ Perfil } />
      <Route path="/comidas" component={ Comidas } />
      <Route path="/bebidas" component="a" />
      <Route exact path="/" component={ Home } />
      <Route component={ NotFound } />
    </Switch>
  );
}

export default App;
