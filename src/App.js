import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router-dom';
import Login from './Pages/Login';

import Comidas from './Pages/Comidas';
import Bebidas from './Pages/Bebidas';
import Explore from './Pages/Explore';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />

        <Route path="/comidas" component={ Comidas } />
        <Route path="/bebidas" component={ Bebidas } />
        <Route path="/explorar" component={ Explore } />
      </Switch>

    </div>
  );
}

export default App;
