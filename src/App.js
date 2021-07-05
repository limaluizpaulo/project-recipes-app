import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import FoodPage from './components/FoodPage';

function App() {
  return (
    // <div className="meals">
    <Switch>
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      <Route exact path="/comidas" component={ FoodPage } />
    </Switch>
    // </div>
  );
}

export default App;
