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
          {/* <Route exact path="/" component={Login} /> */}
          {/* <Route path="/comidas" component={} />
          <Route path="/bebidas" component={} />
          <Route path="/explorar" component={} />
          <Route path="/perfl" component={} />
          <Route path="/receitas-feitas" component={} />
          <Route path="/receitas-favoritas" component={} /> */}
        </MealsProvider>
      </DrinksProvider>
    </Switch>
  );
}

export default App;
