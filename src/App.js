import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/teste" component={ SearchBar } />
    </Switch>
  );
}

export default App;
