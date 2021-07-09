import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
// import Bebidas from './pages/Bebidas';
import Perfil from './pages/Perfil';
import Details from './pages/Details';
import ExploreIngredients from './pages/ExploreIngredients';
import ExploreArea from './pages/ExploreArea';
import Explore from './pages/Explore';
import ExploreRecipes from './pages/ExploreRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/explorar/bebidas/ingredientes" component={ ExploreIngredients } />
      <Route path="/explorar/comidas/ingredientes" component={ ExploreIngredients } />
      <Route path="/explorar/comidas/area" component={ ExploreArea } />
      <Route path="/explorar/comidas" component={ ExploreRecipes } />
      <Route path="/explorar/bebidas" component={ ExploreRecipes } />
      <Route path="/explorar" component={ Explore } />
      <Route exact path="/perfil" component={ Perfil } />
      {/* <Route path="/receitas-feitas" component={ ReceitasFeitas } /> */}
      {/* <Route path="/receitas-favoritas" component={ ReceitasFavoritas } /> */}
      <Route path="/bebidas/:id/in-progress" component={ Details } />
      <Route path="/comidas/:id/in-progress" component={ Details } />
      <Route path="/bebidas/:id" component={ Details } />
      <Route path="/comidas/:id" component={ Details } />
      <Route exact path="/comidas" component={ MainPage } />
      <Route exact path="/bebidas" component={ MainPage } />
    </Switch>
  );
}

export default App;
