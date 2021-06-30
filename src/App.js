import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route } from 'react-router-dom';
import Food from './pages/Food/Food';
import Provider from './Provider/provider';
import Drinks from './pages/Drinks/Drinks';
import Login from './pages/Login/Login';
import Explorar from './pages/Explorar/Explorar';
import ExplorarComidas from './pages/ExplorarComidas/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas/ExplorarBebidas';

const test = '';
function App() {
  return (
    <Provider>
      <Router>
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/comidas" exact component={ Food } />
          <Route path="/comidas/:id" exact component={ test } />
          <Route path="/comidas/:id/in-progress" exact component={ test } />
          <Route path="/bebidas" exact component={ Drinks } />
          <Route path="/bebidas/:id" exact component={ test } />
          <Route path="/bebidas/:id/in-progress" exact component={ test } />
          <Route path="/explorar" exact component={ Explorar } />
          <Route path="/explorar/comidas" exact component={ ExplorarComidas } />
          <Route path="/explorar/bebidas" exact component={ ExplorarBebidas } />
          <Route path="/explorar/comidas/ingredientes" exact component={ test } />
          <Route path="/explorar/bebidas/ingredientes" exact component={ test } />
          <Route path="/explorar/comidas/area" exact component={ test } />
          <Route path="/perfil" exact component={ test } />
          <Route path="/receitas-feitas" exact component={ test } />
          <Route path="/receitas-favoritas" exact component={ test } />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
