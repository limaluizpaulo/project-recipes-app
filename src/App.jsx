import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import HeaderComponent from './components/HeaderComponent';

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route path="/comidas" component={ HeaderComponent } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
