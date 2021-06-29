import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import MainPageFood from './pages/MainPageFood';
import store from './store';

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route to="/" component={ Login } />
          <Route exact to="/comidas" component={ MainPageFood } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
