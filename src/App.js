import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router';
import Login from './pages/login';

function App() {
  return (
    <div>
      <Switch>
        <Route exact paht="/" component={ Login } />
        {/* <Route paht="/comidas" component={ Comidas } /> */}
        {/* <Route paht="/bebidas" component={ Bebidas } /> */}
        {/* <Route paht="/explorar" component={ Explorar } /> */}
        {/* <Route paht="/perfil" component={ Perfil } /> */}
      </Switch>
    </div>
  );
}

export default App;
