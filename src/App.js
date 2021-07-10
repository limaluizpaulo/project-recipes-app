import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import GenericComponent from './Components/GenericComponent';
import { Login, ReceitasFeitas, Recipes, MealDetails, DrinkDetails } from './Pages';

function App() {
  // tudo com GenericComponent não foi implementado
  return (
    <Switch>
      <Route path="/explorar/comidas/area" component={ GenericComponent } />
      <Route path="/explorar/:recipeType/ingredientes" component={ GenericComponent } />
      <Route path="/:recipeType/:id-receita/in-progress" component={ GenericComponent } />
      <Route path="/comidas/:idReceita" component={ MealDetails } />
      <Route path="/bebidas/:idReceita" component={ DrinkDetails } />
      <Route path="/explorar/:recipeType" component={ GenericComponent } />
      <Route path="/receitas-favoritas" component={ GenericComponent } />
      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route path="/:recipeType" component={ Recipes } />
      <Route path="/explorar" component={ GenericComponent } />
      <Route path="/perfil" component={ GenericComponent } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}

export default App;
