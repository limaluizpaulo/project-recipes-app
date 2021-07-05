import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppReceitasProvider from './context/AppReceitasProvider';

import Login from './pages/Login';
import Erro404 from './pages/Page404';
import Explorar from './pages/Explorar';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarComidasPorIngredientes from './pages/ExplorarComidasPorIngredientes';
import ExplorarBebidasPorIngredientes from './pages/ExplorarBebidasPorIngredientes';
import ExplorarComidasPorArea from './pages/ExplorarComidasPorArea';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import Perfil from './pages/Perfil';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Receitas from './pages/Receitas';

function App() {
  return (
    <AppReceitasProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Receitas } />
          <Route exact path="/bebidas" component={ Receitas } />
          <Route path="/comidas/{id-da-receita}" component={ Erro404 } />
          <Route path="/bebidas/{id-da-receita}" component={ Erro404 } />
          <Route path="/comidas/{id-da-receita}/in-progress" component={ Erro404 } />
          <Route path="/bebidas/{id-da-receita}/in-progress" component={ Erro404 } />
          <Route exect path="/explorar" component={ Explorar } />
          <Route exect path="/explorar/comidas" component={ ExplorarComidas } />
          <Route exect path="/explorar/bebidas" component={ ExplorarBebidas } />
          <Route
            path="/explorar/comidas/ingredientes"
            component={ ExplorarComidasPorIngredientes }
          />
          <Route
            path="/explorar/bebidas/ingredientes"
            component={ ExplorarBebidasPorIngredientes }
          />
          <Route path="/explorar/comidas/area" component={ ExplorarComidasPorArea } />
          <Route exect path="/perfil" component={ Perfil } />
          <Route exect path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route exect path="/receitas-favoritas" component={ ReceitasFavoritas } />
        </Switch>
      </BrowserRouter>
    </AppReceitasProvider>
  );
}

export default App;
