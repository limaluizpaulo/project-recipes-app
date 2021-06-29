import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Login, Food } from './pages';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      <Route path="/comidas" component={ Food } />
      <Route path="/bebidas" component={ Login } />
      <Route path="/comidas/:id" render={ (props) => <Login { ...props } /> } />
      <Route path="/bebidas/:id" render={ (props) => <Login { ...props } /> } />
      <Route
        path="/comidas/:id/in-progress"
        render={ (props) => <Login { ...props } /> }
      />
      <Route
        path="/bebidas/:id/in-progress"
        render={ (props) => <Login { ...props } /> }
      />
      <Route path="/explorar" component={ Login } />
      <Route path="/explorar/comidas" component={ Login } />
      <Route path="/explorar/bebidas" component={ Login } />
      <Route path="/explorar/comidas/ingredientes" component={ Login } />
      <Route path="/explorar/bebidas/ingredientes" component={ Login } />
      <Route path="/explorar/comidas/area" component={ Login } />
      <Route path="/perfil" component={ Login } />
      <Route path="/receitas-feitas" component={ Login } />
      <Route path="/receitas-favoritas" component={ Login } />
    </Switch>
  );
}

export default App;
