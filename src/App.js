import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppReceitasProvider from './context/AppReceitasProvider';

import Login from './pages/Login';
import Erro404 from './pages/Page404';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AppReceitasProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Erro404 } />
          <Route exact path="/bebidas" component={ Erro404 } />
          <Route path="/comidas/{id-da-receita}" component={ Erro404 } />
          <Route path="/bebidas/{id-da-receita}" component={ Erro404 } />
          <Route path="/comidas/{id-da-receita}/in-progress" component={ Erro404 } />
          <Route path="/bebidas/{id-da-receita}/in-progress" component={ Erro404 } />
          <Route exect path="/explorar" component={ Erro404 } />
          <Route exect path="/explorar/comidas" component={ Erro404 } />
          <Route exect path="/explorar/bebidas" component={ Erro404 } />
          <Route path="/explorar/comidas/ingredientes" component={ Erro404 } />
          <Route path="/explorar/bebidas/ingredientes" component={ Erro404 } />
          <Route path="/explorar/comidas/area" component={ Erro404 } />
          <Route exect path="/perfil" component={ Erro404 } />
          <Route exect path="/receitas-feitas" component={ Erro404 } />
          <Route exect path="/receitas-favoritas" component={ Erro404 } />
        </Switch>
      </BrowserRouter>
    </AppReceitasProvider>
  );
}

export default App;
