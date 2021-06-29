import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/login';
import Principal from './pages/home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact paht="/" component={ Login } />
          <Route paht="/comidas" component={ Principal } />
          {/* <Route paht="/bebidas" component={ Bebidas } /> */}
          {/* <Route paht="/explorar" component={ Explorar } /> */}
          {/* <Route paht="/perfil" component={ Perfil } /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
