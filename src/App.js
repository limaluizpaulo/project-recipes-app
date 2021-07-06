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
      <Route path="/explorar/:recipeType/ingredientes" component={ GenericComponent } />
      <Route path="/explorar/:recipeType" component={ GenericComponent } />
      <Route path="/explorar/comidas/area" component={ GenericComponent } />
      <Route path="/explorar" component={ GenericComponent } />

      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route
        path="/receitas-favoritas"
        render={ (props) => <GenericComponent { ...props } /> }
      />

      <Route exact path="/" component={ Login } />
      <Route path="/perfil" component={ GenericComponent } />

      <Route
        path="/:recipeType/:id-da-receita/in-progress"
        component={ GenericComponent }
      />
      <Route
        exact
        path="/:recipeType"
        render={ (props) => (<Recipes { ...props } />) }
      />
      <Route path="/:recipeType/:id-da-receita" component={ GenericComponent } />
    </Switch>
  );
}

export default App;
