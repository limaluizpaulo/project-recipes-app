import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import Provider from './context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login,
  Meals,
  Drinks,
  Profile,
  MealsDetails,
  DrinksDetails } from './pages';
// import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas/:id" component={ MealsDetails } />
        <Route path="/comidas" component={ Meals } />
        <Route path="/bebidas/:id" component={ DrinksDetails } />
        <Route path="/bebidas" component={ Drinks } />
        <Route path="/perfil" component={ Profile } />
        {/* <Route exact path="/comidas/:id/in-progress" component={} />
        <Route exact path="/bebidas/:id/in-progress" component={} />
        <Route path="/explorar" component={} />
        <Route path="/explorar/comidas" component={} />
        <Route path="/explorar/bebidas" component={} />
        <Route path="/explorar/comidas/area" component={} />
        <Route path="/explorar/comidas/ingredientes" component={} />
        <Route path="/explorar/bebidas/ingredientes" component={} />
        <Route path="/receitas-feitas" component={} />
        <Route path="/receitas-favoritas" component={} />  */}
      </Switch>
    </Provider>
  );
}

export default App;
