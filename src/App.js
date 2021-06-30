import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import ReceitasFeitas from './Pages/ReceitasFeitas';

function App() {
  return (
    <Switch>
      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
    </Switch>
  );
}

export default App;
