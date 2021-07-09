import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppReceitasProvider from './context/AppReceitasProvider';

import Login from './pages/Login';
import Explorar from './pages/Explorar';
import ExplorarComidasOuBebidas from './pages/ExplorarComidasOuBebidas';
import ExplorarPorIngredientes from './pages/ExplorarComidasPorIngredientes';
import ExplorarComidasPorArea from './pages/ExplorarComidasPorArea';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import Perfil from './pages/Perfil';
import DetailsReceita from './pages/DetailsReceita';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Receitas from './pages/Receitas';
import ReceitaEmProgresso from './pages/ReceitaEmProgresso';

function App() {
  return (
    <AppReceitasProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Receitas } />
          <Route exact path="/bebidas" component={ Receitas } />
          <Route
            path="/comidas/:id/in-progress"
            render={ (props) => <ReceitaEmProgresso { ...props } /> }
          />
          <Route
            path="/bebidas/:id/in-progress"
            render={ (props) => <ReceitaEmProgresso { ...props } /> }
          />
          <Route
            path="/comidas/:id"
            render={ (props) => <DetailsReceita { ...props } /> }
          />
          <Route
            path="/bebidas/:id"
            render={ (props) => <DetailsReceita { ...props } /> }
          />
          <Route exact path="/explorar" component={ Explorar } />
          <Route exact path="/explorar/comidas" component={ ExplorarComidasOuBebidas } />
          <Route exact path="/explorar/bebidas" component={ ExplorarComidasOuBebidas } />
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
        </Switch>
      </BrowserRouter>
    </AppReceitasProvider>
  );
}

export default App;
