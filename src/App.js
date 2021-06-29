import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './Pages/Login';
import Test from './Pages/Test';

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/comidas" component={ Test } />
        <Route path="/perfil" component={ Test } />
        <Route path="/" component={ Login } />
      </Switch>
    </Provider>
  );
}

export default App;
