import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import Perfil from './pages/Perfil';
import Explorar from './pages/Explorar';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      {/* <Route path="/explorar/bebidas/ingredientes" component={ Ingredients } /> */}
      {/* <Route path="/explorar/comidas/ingredientes" component={ Ingredients } /> */}
      {/* <Route path="/explorar/comidas/area" component={ ExplorarArea } /> */}
      {/* <Route path="/explorar/comidas" component={ ExplorarComidas } />
      <Route path="/explorar/bebidas" component={ ExplorarBebidas } /> */}
      <Route exact path="/explorar" component={ Explorar } />
      <Route exact path="/perfil" component={ Perfil } />
      {/* <Route path="/receitas-feitas" component={ ReceitasFeitas } /> */}
      {/* <Route path="/receitas-favoritas" component={ ReceitasFavoritas } /> */}
      {/* <Route path="/bebidas/:id/in-progress" component={ InProgress } /> */}
      {/* <Route path="/comidas/:id/in-progress" component={ InProgress } /> */}
      {/* <Route path="/bebidas/:id" component={ Details } /> */}
      {/* <Route path="/comidas/:id" component={ Details } /> */}
      <Route exact path="/comidas" component={ Comidas } />
      <Route exact path="/bebidas" component={ Bebidas } />
    </Switch>
  );
}

export default App;
