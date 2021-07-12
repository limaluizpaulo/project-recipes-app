import React from 'react';
import { Switch, Route } from 'react-router';
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
import ExpIngredients from './components/ExpIngredients';
import ExpArea from './components/ExpArea';
import ExpSurprise from './components/ExpSurprise';

function App() {
  return (
    <ProviderRecipes>
      {/* <div className="meals"> */}
      <Switch>
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
        <Route path="/comidas" render={ (props) => <FoodPage { ...props } /> } />
        <Route path="/bebidas" render={ (props) => <DrinkPage { ...props } /> } />
        <Route
          path="/explorar/comidas/ingredientes"
          render={ (props) => <ExpIngredients { ...props } /> }
        />
        <Route
          path="/explorar/comidas/area"
          render={ (props) => <ExpArea { ...props } /> }
        />
        <Route
          path="/explorar/comidas/:id"
          render={ (props) => <ExpSurprise { ...props } /> }
        />
        <Route
          path="/explorar/comidas"
          render={ (props) => <ExploreFoods { ...props } /> }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          render={ (props) => <ExpIngredients { ...props } /> }
        />
        <Route
          path="/explorar/bebidas/:id"
          render={ (props) => <ExpSurprise { ...props } /> }
        />
        <Route
          path="/explorar/bebidas"
          render={ (props) => <ExploreDrinks { ...props } /> }
        />
        <Route path="/explorar" render={ (props) => <ExplorePage { ...props } /> } />
        <Route path="/profile" render={ (props) => <Profile { ...props } /> } />
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      </Switch>
      {/* </div> */}
    </ProviderRecipes>
  );
}

export default App;
