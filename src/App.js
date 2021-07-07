import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import MainPage from './pages/MainPage';
import Perfil from './pages/Perfil';
import Explore from './pages/Explore';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import AreaExplorer from './pages/AreaExplorer';
import SearchIngredients from './pages/SearchIngredients';
import InProgress from './pages/InProgress';
import ExplorarMenu from './pages/ExplorarMenu';
import IdFood from './pages/IdFood';

function App() {
  return (
    <Switch>
      <Route path="/explorar/comidas/area" component={ Explore } />
      <Route path="/explorar/bebidas/ingredientes" component={ Explore } />
      <Route path="/explorar/comidas/ingredientes" component={ Explore } />
      <Route path="/comidas/:id/in-progress" component={ InProgress } />
      <Route path="/bebidas/:id/in-progress" component={ InProgress } />
      <Route path="/explorar/comidas" component={ Explore } />
      <Route path="/explorar/bebidas" component={ Explore } />
      <Route path="/comidas/:id" component={ IdFood } />
      <Route path="/bebidas/:id" component={ IdFood } />
      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/perfil" component={ Perfil } />
      <Route path="/comidas" component={ MainPage } />
      <Route path="/bebidas" component={ MainPage } />
      <Route exact path="/" component={ Home } />
      <Route component={ NotFound } />
    </Switch>
  );
}

export default App;
