import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ReceitaDetalhes from './pages/ReceitaDetalhes';
// import ReceitaEmProgresso from './pages/ReceitaEmProgresso';
import Login from './pages/Login';
import ExplorarReceitas from './pages/ExploreRecipes';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';
import ComidasArea from './pages/ComidasArea';
import Ingredients from './pages/Ingredientes';
import Principal from './pages/Principal';
import NotFound from './pages/NotFound';
import Explorar from './pages/Explorar';
import Perfil from './pages/Perfil';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Principal } />
        <Route exact path="/bebidas" component={ Principal } />
        <Route exact path="/comidas/:id" component={ ReceitaDetalhes } />
        <Route exact path="/bebidas/:id" component={ ReceitaDetalhes } />
        {/* <Route path="/comidas/:id/in-progress" component={ ReceitaEmProgresso } />
        <Route path="/bebidas/:id/in-progress" component={ ReceitaEmProgresso } /> */}
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarReceitas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarReceitas } />
        <Route exact path="/explorar/comidas/ingredientes" component={ Ingredients } />
        <Route exact path="/explorar/bebidas/ingredientes" component={ Ingredients } />
        <Route exact path="/explorar/comidas/area" component={ ComidasArea } />
        <Route path="/perfil" component={ Perfil } />
        { /* <Route path="/receitas-feitas" component={ReceitasFeitas} /> */ }
        { /* <Route path="/receitas-favoritas" component={ReceitasFavoritas} /> */ }
        <Route component={ NotFound } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
