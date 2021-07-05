import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login, MainPage, RecipeInProgress, DoneRecipes, Explore,
  ExploreMealsOrDrinks } from './pages';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ MainPage } />
          <Route exact path="/bebidas" component={ MainPage } />
          <Route exact path="/comidas/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/receitas-feitas" component={ DoneRecipes } />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/explorar/comidas" component={ ExploreMealsOrDrinks } />
          <Route exact path="/explorar/bebidas" component={ ExploreMealsOrDrinks } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
