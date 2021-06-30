import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';

import Provider from './context/ContextForm';
import SearchProvider from './context/ContextSearch';
import Comidas from './pages/Comidas';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <SearchProvider>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/comidas" component={ Comidas } />
          </Switch>
        </SearchProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
