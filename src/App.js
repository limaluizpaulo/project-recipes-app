import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import ReceitasFeitas from './Pages/ReceitasFeitas';
import Recipes from './Pages/Recipes';
import GenericComponent from './Components/GenericComponent';

function App() {
  // tudo com GenericComponent não foi implementado
  return (
    <Switch>
      <Route path="/explorar/:recipetype/ingredientes" component={ GenericComponent } />
      <Route path="/explorar/:recipetype" component={ GenericComponent } />
      <Route path="/explorar/comidas/area" component={ GenericComponent } />
      <Route path="/explorar" component={ GenericComponent } />

      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route path="/receitas-favoritas" component={ GenericComponent } />

      <Route exact path="/" component={ Login } />

      <Route path="/:recipetype/:id-da-receita/in-progress" component={ GenericComponent } />
      <Route
        exact
        path="/:recipetype"
        render={ (props) => (<Recipes { ...props } />) }
      />
      <Route path="/:recipetype/:id-da-receita" component={ GenericComponent } />
      <Route path="/perfil" component={ GenericComponent } />
    </Switch>
  );
}

export default App;
