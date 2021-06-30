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
            <Route exact path="/" component={ Login } />
            <Route path="/comidas" component={ MainPage } />
            <Route path="/bebidas" component={ MainPage } />
          </Switch>
        </BrowserRouter>
      </AppRecipeProvider>
    </Provider>
  );
}

export default App;
