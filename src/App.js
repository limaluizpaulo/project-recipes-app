import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './pages/Login';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
