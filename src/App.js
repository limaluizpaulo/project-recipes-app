import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import FoodPage from './components/FoodPage';
import DrinkPage from './components/DrinkPage';
import Profile from './components/Profile';
import ExplorePage from './components/ExplorePage';
import ProviderRecipes from './context/ProviderRecipes';

function App() {
  return (
    <ProviderRecipes>
      {/* <div className="meals"> */}
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route exact path="/comidas" render={ (props) => <FoodPage { ...props } /> } />
        <Route exact path="/bebidas" render={ (props) => <DrinkPage { ...props } /> } />
        <Route exact path="/explore" render={ (props) => <ExplorePage { ...props } /> } />
        <Route exact path="/profile" render={ (props) => <Profile { ...props } /> } />
      </Switch>
      {/* </div> */}
    </ProviderRecipes>
  );
}

export default App;
