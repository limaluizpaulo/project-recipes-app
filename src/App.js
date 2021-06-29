import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import DrinksProvider from './context/DrinksProvider';
import MealsProvider from './context/MealsProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
// import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <Switch>
      <DrinksProvider>
        <MealsProvider>
          <Route exact path="/" components={} />
          <Route path="/comidas" components={} />
          <Route path="/bebidas" components={} />
          <Route path="/explorar" components={} />
          <Route path="/perfl" components={} />
          <Route path="/receitas-feitas" components={} />
          <Route path="/receitas-favoritas" components={} />
        </MealsProvider>
      </DrinksProvider>
    </Switch>
  );
}

export default App;
