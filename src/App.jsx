import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store';
import AppRecipeProvider from './context/AppRecipeProvider';
import { Login, MainFood, MainDrink } from './pages';

function App() {
  return (
    <Provider store={ store }>
      <AppRecipeProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/comidas" component={ MainFood } />
            <Route path="/bebidas" component={ MainDrink } />
          </Switch>
        </BrowserRouter>
      </AppRecipeProvider>
    </Provider>
  );
}

export default App;
