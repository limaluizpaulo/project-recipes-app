import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login, MainPage } from './pages';
import AppRecipeProvider from './context/AppRecipeProvider';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={ store }>
      <AppRecipeProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/comidas" component={ MainPage } />
            <Route exact path="/bebidas" component={ MainPage } />
            <Route exact path="/" component={ Login } />
          </Switch>
        </BrowserRouter>
      </AppRecipeProvider>
    </Provider>
  );
}

export default App;
