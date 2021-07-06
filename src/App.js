import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppReceitasProvider from './context/AppReceitasProvider';

import Login from './pages/Login';
import Erro404 from './pages/Page404';
import Explorar from './pages/Explorar';
import ExplorarComidasOuBebidas from './pages/ExplorarComidasOuBebidas';
import ExplorarComidasPorIngredientes from './pages/ExplorarComidasPorIngredientes';
import ExplorarBebidasPorIngredientes from './pages/ExplorarBebidasPorIngredientes';
import ExplorarComidasPorArea from './pages/ExplorarComidasPorArea';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import Perfil from './pages/Perfil';
import DetailsReceita from './pages/DetailsReceita';

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
          <Route
            path="/comidas/:id"
            render={ (props) => <DetailsReceita { ...props } /> }
          />
          <Route
            path="/bebidas/:id"
            render={ (props) => <DetailsReceita { ...props } /> }
          />
          <Route path="/comidas/{id-da-receita}/in-progress" component={ Erro404 } />
          <Route path="/bebidas/{id-da-receita}/in-progress" component={ Erro404 } />
          <Route exact path="/explorar" component={ Explorar } />
          <Route exact path="/explorar/comidas" component={ ExplorarComidasOuBebidas } />
          <Route exact path="/explorar/bebidas" component={ ExplorarComidasOuBebidas } />
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
          {/* <Route component={ Erro404 } /> */}
        </Switch>
      </BrowserRouter>
    </AppReceitasProvider>
  );
}

export default App;
