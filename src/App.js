import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login';
import PricipalComidas from './pages/principal/PrincipalComidas';
import PrincipalBebidas from './pages/principal/PrincipalBebidas';
import DetalhesComida from './pages/detalhes/DetalhesBebida';
import DetalhesBebida from './pages/detalhes/DetalhesComida';
import ComidaEmProcesso from './pages/em-processo/ComidaEmProcesso';
import BebidaEmProcesso from './pages/em-processo/BebidaEmProcesso';
import Explorar from './pages/explorar';
import ExplorarComidas from './pages/explorar/comidas';
import ExplorarBebidas from './pages/explorar/bebidas';
import ComidasPorIngredientes from './pages/explorar/comidas/ComidasPorIngredientes';
import BebidasPorIngredientes from './pages/explorar/bebidas/BebidasPorIngredientes';
import ComidasPorArea from './pages/explorar/comidas/ComidasPorArea';
import Perfil from './pages/perfil';
import ReceitasFeitas from './pages/receitas-feitas';
import ReceitasFavoritas from './pages/receitas-favoritas';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ PricipalComidas } />
        <Route exact path="/bebidas" component={ PrincipalBebidas } />
        <Route exact path="/comidas/:id" component={ DetalhesComida } />
        <Route exact path="/bebidas/:id" component={ DetalhesBebida } />
        <Route exact path="/comidas/:id/in-progress" component={ ComidaEmProcesso } />
        <Route exact path="/bebidas/:id/in-progress" component={ BebidaEmProcesso } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ComidasPorIngredientes }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ BebidasPorIngredientes }
        />
        <Route exact path="/explorar/comidas/area" component={ ComidasPorArea } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
