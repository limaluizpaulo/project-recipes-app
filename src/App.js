import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Perfil from './Pages/Perfil';
import ReceitasFavoritas from './Pages/ReceitasFavoritas';

import GenericComponent from './Components/GenericComponent';
import { Login, ReceitasFeitas, Recipes, MealDetails, DrinkDetails } from './Pages';
import Explore from './Pages/Explore';
import ExploreByType from './Pages/ExploreByType';
import ExploreIngredientes from './Pages/ExploreIngredientes';
import RecipesByIngredient from './Pages/RecipesByIngredient';
import ExploreByArea from './Pages/ExploreByArea';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <Switch>
      <Route path="/explorar/comidas/area" component={ ExploreByArea } />
      <Route path="/explorar/:recipeType/ingredientes" component={ ExploreIngredientes } />
      <Route path="/:recipeType/:id-receita/in-progress" component={ GenericComponent } />
      <Route path="/comidas/:idReceita" component={ MealDetails } />
      <Route path="/bebidas/:idReceita" component={ DrinkDetails } />
      <Route path="/explorar/:recipeType" component={ ExploreByType } />
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route path="/:recipeType/ingredientes/:ingredientName" component={ RecipesByIngredient } />
      <Route path="/:recipeType" component={ Recipes } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/perfil" component={ Perfil } />
      <Route path="/" component={ Login } />
      <Route path="/explorar/bebidas/area" component={ NotFound } />
    </Switch>
  );
}

export default App;
