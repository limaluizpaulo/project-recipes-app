import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Pages/Login';
import Comidas from './Pages/Comidas';
// import Switch from 'react-bootstrap/esm/Switch';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
      </Switch>
    </div>
  );
}

export default App;
