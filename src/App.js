import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import ProviderBebidas from './context/ProviderBebidas';

import { Bebidas, Comidas, ExpBebidas, ExpBebidasIngredientes, ExpComidas,
  ExpComidasArea, ExpComidasIngredientes, Explorar, Login, Perfil,
  DetalhesComida, DetalhesBebida } from './Pages';

function App() {
  return (
    <Provider>
      <ProviderBebidas>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Comidas } />
          <Route exact path="/bebidas" component={ Bebidas } />
          <Route path="/comidas/:id" component={ DetalhesComida } />
          <Route path="/bebidas/:id" component={ DetalhesBebida } />
          <Route path="/perfil" component={ Perfil } />
          <Route path="/explorar" component={ Explorar } />
          <Route path="/explorar/comidas" component={ ExpComidas } />
          <Route
            path="/explorar/comidas/ingredientes"
            component={ ExpComidasIngredientes }
          />
          <Route path="/explorar/comidas/area" component={ ExpComidasArea } />
          <Route path="/explorar/bebidas" component={ ExpBebidas } />
          <Route
            path="/explorar/bebidas/ingredientes"
            component={ ExpBebidasIngredientes }
          />
        </Switch>
      </ProviderBebidas>
    </Provider>
  );
}

export default App;
