import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/login';
import Comidas from './pages/principal/Comidas';
import Bebidas from './pages/principal/Bebidas';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route path="/comidas/:id" component={ Comidas } />
        <Route path="/bebidas/:id" component={ Comidas } />
        <Route path="/comidas/:id/in-progress" component={ Comidas } />
        <Route path="/bebidas/:id/in-progress" component={ Comidas } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route path="/explorar/comidas" component={ Comidas } />
        <Route path="/explorar/bebidas" component={ Comidas } />
        <Route path="/explorar/comidas/ingredientes" component={ Comidas } />
        <Route path="/explorar/bebidas/ingredientes" component={ Comidas } />
        <Route path="/explorar/comidas/area" component={ Comidas } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/receitas-feitas" component={ Comidas } />
        <Route path="/receitas-favoritas" component={ Comidas } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
