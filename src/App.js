import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Login, ReceitasFeitas, Recipes, MealDetails, DrinkDetails,
  MealProgress, DrinkProgress } from './Pages';

import Perfil from './Pages/Perfil';
import ReceitasFavoritas from './Pages/ReceitasFavoritas';
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
      <Route
        path="/explorar/:recipeType/ingredientes"
        component={ ExploreIngredientes }
      />
      <Route path="/comidas/:idReceita/in-progress" component={ MealProgress } />
      <Route path="/bebidas/:idReceita/in-progress" component={ DrinkProgress } />
      <Route exact path="/comidas/:idReceita" component={ MealDetails } />
      <Route exact path="/bebidas/:idReceita" component={ DrinkDetails } />
      <Route exact path="/explorar/:recipeType" component={ ExploreByType } />
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route
        path="/:recipeType/ingredientes/:ingredientName"
        component={ RecipesByIngredient }
      />
      <Route exact path="/explorar" component={ Explore } />
      <Route path="/perfil" component={ Perfil } />
      <Route exact path="/:recipeType" component={ Recipes } />
      <Route exact path="/" component={ Login } />
      <Route path="/explorar/bebidas/area" component={ NotFound } />
    </Switch>
  );
}

export default App;
