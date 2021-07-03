import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';

import { Bebidas, Comidas, ExpBebidas, ExpBebidasIngredientes, ExpComidas,
  ExpComidasArea, ExpComidasIngredientes, Explorar, Login, Perfil,
  Detalhes, ReceitasFeitas, ReceitasFavoritas } from './Pages';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route path="/comidas/:id" component={ Detalhes } />
        <Route path="/bebidas/:id" component={ Detalhes } />
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
        <Route
          path="/receitas-feitas"
          component={ ReceitasFeitas }
        />
        <Route
          path="/receitas-favoritas"
          component={ ReceitasFavoritas }
        />
      </Switch>
    </Provider>
  );
}

export default App;
