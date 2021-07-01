import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import login from './pages/login';
import Comidas from './pages/comidas';
import Bebidas from './pages/bebidas';
import Perfil from './pages/telaDePerfil';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/receitas-feitas" />
          <Route path="/receitas-favoritas" />
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
