import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import ExplorarReceitas from './pages/ExploreRecipes';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';
import ComidasArea from './pages/ComidasArea';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        {/* <Route path="/comidas" component={Comidas} /> */}
        {/* <Route path="/bebidas" component={Bebidas} /> */}
        {/* <Route path="/comidas/:id" component={ReceitaDetalhes} /> */}
        {/* <Route path="/bebidas/:id" component={ReceitaDetalhes} /> */}
        {/* <Route path="/comidas/:id/in-progress" component={ReceitaEmProgresso} /> */}
        {/* <Route path="/bebidas/:id/in-progress" component={ReceitaEmProgresso} /> */}
        {/* <Route path="/explorar" component={ Explore } /> */}
        <Route path="/explorar/comidas" component={ ExplorarReceitas } />
        <Route path="/explorar/bebidas" component={ ExplorarReceitas } />
        {/* <Route path="/explorar/comidas/ingredientes"
        component={ComidasIngredientes} /> */}
        {/* <Route path="/explorar/bebidas/ingredientes"
        component={BebidasIngredientes} /> */}
        <Route exact path="/explorar/comidas/area" component={ ComidasArea } />
        {/* <Route path="/perfil" component={Perfil} /> */}
        {/* <Route path="/receitas-feitas" component={ReceitasFeitas} /> */}
        {/* <Route path="/receitas-favoritas" component={ReceitasFavoritas} /> */}
      </Switch>
    </RecipesProvider>
    // <div className="meals">
    //   <span className="logo">TRYBE</span>
    //   <object
    //     className="rocksGlass"
    //     type="image/svg+xml"
    //     data={ rockGlass }
    //   >
    //     Glass
    //   </object>
    // </div>
  );
}

export default App;
