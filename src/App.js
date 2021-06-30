import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route } from 'react-router-dom';
import Food from './components/Food';
import Provider from './Provider/provider';
import Drinks from './components/Drinks';
import Login from './components/Login/Login';

function App() {
  return (
    <Provider>
      <Router>
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/comidas" exact component={ Food } />
          <Route path="/bebidas" exact component={ Drinks } />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
