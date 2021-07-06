import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import FoodPage from './components/FoodPage';
import Profile from './components/Profile';
<<<<<<< HEAD

function App() {
  return (
    // <div className="meals">
    <Switch>
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      <Route exact path="/comidas" component={ FoodPage } />
      <Route exact path="/profile" render={ (props) => <Profile { ...props } /> } />
    </Switch>
    // </div>
=======
import ProviderRecipes from './context/ProviderRecipes';

function App() {
  return (
    <ProviderRecipes>
      {/* <div className="meals"> */}
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route exact path="/comidas" render={ (props) => <FoodPage { ...props } /> } />
        <Route exact path="/profile" render={ (props) => <Profile { ...props } /> } />
      </Switch>
      {/* </div> */}
    </ProviderRecipes>
>>>>>>> 45351b397b203f3f06f2d220117a82bc2a1163bf
  );
}

export default App;
