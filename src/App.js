import React from 'react';
import { Switch, Route } from 'react-router';
import NotFound from './components/NotFound';
import Login from './components/Login';
import FoodPage from './components/FoodPage';
import DrinkPage from './components/DrinkPage';
import ExplorePage from './components/ExplorePage';
import Profile from './components/Profile';
import ProviderRecipes from './context/ProviderRecipes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailsFoodPage from './components/DetailsFoodPage';
import DetailsDrinkPage from './components/DetailsDrinkPage';
import ExploreFoods from './components/ExploreFoods';
import ExploreDrinks from './components/ExploreDrinks';
import ExpFoodIngredients from './components/ExpFoodIngredients';
import ExpAreaFood from './components/ExpAreaFood';
// import ExpSurprise from './components/ExpSurprise';
import ExpDrinkIngredients from './components/ExpDrinkIngredients';

function App() {
  return (
    <ProviderRecipes>
      {/* <div className="meals"> */}
      <Switch>
        <Route
          path="/explorar/comidas/ingredientes"
          render={ (props) => <ExpFoodIngredients { ...props } /> }
        />
        <Route
          path="/explorar/comidas/area"
          render={ (props) => <ExpAreaFood { ...props } /> }
        />
        <Route
          path="/explorar/bebidas/area"
          component={ NotFound }
        />
        <Route
          path="/explorar/comidas/:id"
          render={ (props) => <DetailsFoodPage { ...props } /> }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          render={ (props) => <ExpDrinkIngredients { ...props } /> }
        />
        <Route
          exact
          path="/comidas/:id"
          render={ (props) => <DetailsFoodPage { ...props } /> }
        />
        <Route
          exact
          path="/bebidas/:id"
          render={ (props) => <DetailsDrinkPage { ...props } /> }
        />
        <Route
          path="/explorar/comidas"
          render={ (props) => <ExploreFoods { ...props } /> }
        />
        <Route
          path="/explorar/bebidas"
          render={ (props) => <ExploreDrinks { ...props } /> }
        />
        <Route path="/explorar" render={ (props) => <ExplorePage { ...props } /> } />
        <Route path="/profile" render={ (props) => <Profile { ...props } /> } />
        <Route path="/comidas" render={ (props) => <FoodPage { ...props } /> } />
        <Route path="/bebidas" render={ (props) => <DrinkPage { ...props } /> } />
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route default component={ NotFound } />
      </Switch>
      {/* </div> */}
    </ProviderRecipes>
  );
}

export default App;
