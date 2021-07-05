import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
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

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route path="/explorar/comidas/ingredientes" component={ ExpoFoodsIng } />
        <Route path="/explorar/comidas/area" component={ ExpoFoodArea } />
        <Route exact path="/comidas/:id" component={ FoodDetails } />
        <Route path="/explorar/comidas" component={ ExploreFoods } />
        <Route exact path="/comidas" component={ Foods } />
        <Route path="/explorar/bebidas/ingredientes" component={ ExpoDrinksIng } />
        <Route path="/explorar/bebidas/area" component={ NotFound } />
        <Route exact path="/bebidas/:id" component={ DrinkDetails } />
        <Route path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route path="/bebidas" component={ Drinks } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/" component={ Login } />
      </Switch>

    </div>
  );
}

export default App;
