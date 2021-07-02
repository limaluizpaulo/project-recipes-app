import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';

import { Bebidas, Comidas, ExpBebidas, ExpBebidasIngredientes, ExpComidas,
  ExpComidasArea, ExpComidasIngredientes, Explorar, Login, Perfil,
  DetalhesComida, DetalhesBebida } from './Pages';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route path="/comidas/:id" component={ DetalhesComida } />
        <Route path="/bebidas/:id" component={ DetalhesBebida } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExpComidas } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExpComidasIngredientes }
        />
        <Route exact path="/explorar/comidas/area" component={ ExpComidasArea } />
        <Route exact path="/explorar/bebidas" component={ ExpBebidas } />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExpBebidasIngredientes }
        />
      </Switch>
    </Provider>
  );
}

export default App;
