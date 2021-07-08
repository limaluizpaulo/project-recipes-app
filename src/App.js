import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import ReceitasFeitas from './Pages/ReceitasFeitas';
import ReceitasFavoritas from './Pages/ReceitasFavoritas';
import Recipes from './Pages/Recipes';
import GenericComponent from './Components/GenericComponent';
import Explore from './Pages/Explore';
import ExploreByType from './Pages/ExploreByType';
import ExploreIngredientes from './Pages/ExploreIngredientes';
import RecipesByIngredient from './Pages/RecipesByIngredient';
import ExploreByArea from './Pages/ExploreByArea';
import NotFound from './Pages/NotFound';

function App() {
  // tudo com GenericComponent não foi implementado
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route
        path="/explorar/:recipeType/ingredientes"
        render={ (props) => <ExploreIngredientes { ...props } /> }
      />
      <Route
        exact
        path="/explorar/:recipeType"
        render={ (props) => <ExploreByType { ...props } /> }
      />
      <Route
        path="/explorar/comidas/area"
        render={ (props) => <ExploreByArea { ...props } /> }
      />
      <Route
        path="/explorar/bebidas/area"
        component={ <NotFound /> }
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
        render={ (props) => <ReceitasFavoritas { ...props } /> }
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
        path="/:recipeType/ingredientes/:ingredientName"
        render={ (props) => <RecipesByIngredient { ...props } /> }
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
