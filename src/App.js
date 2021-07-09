import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Perfil from './Pages/Perfil';
import ReceitasFavoritas from './Pages/ReceitasFavoritas';

import GenericComponent from './Components/GenericComponent';
import { Login, ReceitasFeitas, Recipes, MealDetails, DrinkDetails } from './Pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route
        path="/explorar/:recipeType/ingredientes"
        render={ (props) => <GenericComponent { ...props } /> }
      />
      <Route
        path="/explorar/:recipeType"
        render={ (props) => <GenericComponent { ...props } /> }
      />
      <Route
        path="/explorar/comidas/area"
        render={ (props) => <GenericComponent { ...props } /> }
      />
      <Route
        path="/explorar"
        render={ (props) => <GenericComponent { ...props } /> }
      />

      <Route
        path="/receitas-feitas"
        render={ (props) => <ReceitasFeitas { ...props } /> }
      />
      <Route
        path="/receitas-favoritas"
        render={ (props) => <ReceitasFavoritas { ...props } /> }
      />

      <Route
        path="/perfil"
        render={ <Perfil /> }
      />

      <Route
        path="/:recipeType/:id-da-receita/in-progress"
        component={ GenericComponent }
      />
      <Route
        exact
        path="/comidas/:id"
        render={ (props) => <MealDetails { ...props } /> }
      />
      <Route
        exact
        path="/bebidas/:id"
        render={ (props) => <DrinkDetails { ...props } /> }
      />
      <Route
        path="/:recipeType"
        render={ (props) => (<Recipes { ...props } />) }
      />
    </Switch>
  );
}

export default App;
