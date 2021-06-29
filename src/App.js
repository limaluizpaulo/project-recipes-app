import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component="a" />
      <Route exact path="/comidas" component="a" />
      <Route exact path="/bebidas" component="a" />
      <Route exact path="/comidas/{id-da-receita}" component="a" />
      <Route exact path="/bebidas/{id-da-receita}" component="a" />
      <Route exact path="/comidas/{id-da-receita}/in-progress" component="a" />
      <Route exact path="/bebidas/{id-da-receita}/in-progress" component="a" />
      <Route exact path="/explorar" component="a" />
      <Route exact path="/explorar/comidas" component="a" />
      <Route exact path="/explorar/bebidas" component="a" />
      <Route exact path="/explorar/comidas/ingredientes" component="a" />
      <Route exact path="/explorar/bebidas/ingredientes" component="a" />
      <Route exact path="/explorar/comidas/area" component="a" />
      <Route exact path="/perfil" component="a" />
      <Route exact path="/receitas-feitas" component="a" />
      <Route exact path="/receitas-favoritas" component="a" />
    </Switch>
  );
}

export default App;
