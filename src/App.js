import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import ReceitasFeitas from './Pages/ReceitasFeitas';
import Recipes from './Pages/Recipes';
import GenericComponent from './Components/GenericComponent';
import Explore from './Pages/Explore';
import ExploreByType from './Pages/ExploreByType';

function App() {
  // tudo com GenericComponent não foi implementado
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route
        path="/explorar/:recipeType/ingredientes"
        render={ (props) => <GenericComponent { ...props } /> }
      />
      <Route
        exact
        path="/explorar/:recipeType"
        render={ (props) => <ExploreByType { ...props } /> }
      />
      <Route
        path="/explorar/comidas/area"
        render={ (props) => <GenericComponent { ...props } /> }
      />
      <Route
        exact
        path="/explorar"
        render={ (props) => <Explore { ...props } /> }
      />

      <Route
        path="/receitas-feitas"
        render={ (props) => <ReceitasFeitas { ...props } /> }
      />
      <Route
        path="/receitas-favoritas"
        render={ (props) => <GenericComponent { ...props } /> }
      />

      <Route
        path="/perfil"
        render={ (props) => <GenericComponent { ...props } /> }
      />

      <Route
        path="/:recipeType/:id-da-receita/in-progress"
        component={ GenericComponent }
      />
      <Route
        path="/:recipeType/:id-da-receita"
        component={ GenericComponent }
      />
      <Route
        exact
        path="/:recipeType"
        render={ (props) => (<Recipes { ...props } />) }
      />
    </Switch>
  );
}

export default App;
