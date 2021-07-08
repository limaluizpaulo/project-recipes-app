import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppReceitasProvider from './context/AppReceitasProvider';

import Login from './pages/Login';
import Erro404 from './pages/Page404';
import Explorar from './pages/Explorar';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarPorIngredientes from './pages/ExplorarComidasPorIngredientes';
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
          <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
          <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
          <Route
            path="/explorar/comidas/ingredientes"
            component={ ExplorarPorIngredientes }
          />
          <Route
            path="/explorar/bebidas/ingredientes"
            component={ ExplorarPorIngredientes }
          />
          <Route path="/explorar/comidas/area" component={ ExplorarComidasPorArea } />
          <Route exact path="/perfil" component={ Perfil } />
          <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
          {/* <Route component={ Erro404 } /> */}
        </Switch>
      </BrowserRouter>
    </AppReceitasProvider>
  );
}

export default App;
