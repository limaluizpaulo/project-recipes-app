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

function App() {
  return (
    <ProviderRecipes>
      {/* <div className="meals"> */}
      <Switch>
        <Route path="/comidas" render={ (props) => <FoodPage { ...props } /> } />
        <Route path="/bebidas" render={ (props) => <DrinkPage { ...props } /> } />
        <Route path="/explore" render={ (props) => <ExplorePage { ...props } /> } />
        <Route path="/profile" render={ (props) => <Profile { ...props } /> } />
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      </Switch>
      {/* </div> */}
    </ProviderRecipes>
  );
}

export default App;
