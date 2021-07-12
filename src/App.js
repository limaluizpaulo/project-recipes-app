import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import './styles/login.css';
import './styles/foods.css';
import './styles/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Foods from './Pages/Foods';
import Drinks from './Pages/Drinks';
import Explore from './Pages/Explore';
import ExploreFoods from './Pages/ExploreFoods';
import ExpoFoodsIng from './Pages/ExpoFoodsIng';
import ExpoFoodArea from './Pages/ExpoFoodArea';
import ExploreDrinks from './Pages/ExploreDrinks';
import ExpoDrinksIng from './Pages/ExpoDrinksIng';
import NotFound from './Pages/NotFound';
import Profile from './Pages/Profile';
import FoodDetails from './Pages/FoodDetails';
import DrinkDetails from './Pages/DrinkDetails';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import RecipesMade from './Pages/RecipesMade';
import './styles/cards.css';
import './styles/details.css';
import Progress from './Pages/Progress';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/explorar/comidas/ingredientes" component={ ExpoFoodsIng } />
        <Route exact path="/explorar/comidas/area" component={ ExpoFoodArea } />
        <Route exact path="/comidas/:id" component={ FoodDetails } />
        <Route exact path="/comidas/:id/in-progress" component={ Progress } />
        <Route exact path="/bebidas/:id/in-progress" component={ Progress } />
        <Route exact path="/explorar/comidas" component={ ExploreFoods } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/explorar/bebidas/ingredientes" component={ ExpoDrinksIng } />
        <Route exact path="/explorar/bebidas/area" component={ NotFound } />
        <Route exact path="/bebidas/:id" component={ DrinkDetails } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route exact path="/receitas-feitas" component={ RecipesMade } />
        <Route exact path="/" component={ Login } />
      </Switch>

    </div>
  );
}

export default App;
