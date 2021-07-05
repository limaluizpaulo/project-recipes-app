import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login, MainPage, DoneRecipes } from './pages';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas" component={ MainPage } />
          <Route path="/bebidas" component={ MainPage } />
          <Route path="/receitas-feitas" component={ DoneRecipes } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
