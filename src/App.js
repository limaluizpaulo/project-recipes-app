import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import login from './pages/login';
import Comidas from './pages/comidas';
import Bebidas from './pages/bebidas';
import Perfil from './pages/telaDePerfil';
import Detalhes from './pages/Detalhes';
import Explorarcomidas from './pages/explorarComidas/ExplorarBebidasComidas';
import Explorar from './pages/telaDeExplorar';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/explorar/comidas/area" />
          <Route path="/explorar/bebidas/ingredientes" />
          <Route path="/explorar/comidas/ingredientes" />
          <Route path="/explorar/comidas" component={ Explorarcomidas } />
          <Route path="/explorar/bebidas" component={ Explorarcomidas } />
          <Route path="/:page/:id" render={ (props) => <Detalhes { ...props } /> } />
          <Route path="/receitas-feitas" />
          <Route path="/receitas-favoritas" />
          <Route path="/explorar" component={ Explorar } />
          <Route path="/perfil" component={ Perfil } />
          <Route path="/bebidas" component={ Bebidas } />
          <Route path="/comidas" component={ Comidas } />
          <Route exact path="/" component={ login } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
