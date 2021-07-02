import React, { useContext } from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './context/user.context';

// import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login';
import Principal from './pages/Principal';
import Details from './pages/Details';
import ComidaEmProcesso from './pages/em-processo/ComidaEmProcesso';
import BebidaEmProcesso from './pages/em-processo/BebidaEmProcesso';
import Explorar from './pages/explorar';
import ExplorarComidaOuBebida from './pages/explorar/ExplorarComidaOuBedida';
import ExplorarPorIngredientes from './pages/explorar/ingredientes';
import ExplorarPorArea from './pages/explorar/area';
import Perfil from './pages/perfil';
import ReceitasFeitas from './pages/receitas-feitas';
import ReceitasFavoritas from './pages/receitas-favoritas';
import WarningMessage from './components/WarningMessage';
import './App.css';

function App() {
  const { showMessage } = useContext(UserContext);
  return (
    <BrowserRouter>
    {showMessage && <WarningMessage />}
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Principal } />
        <Route exact path="/bebidas" component={ Principal } />
        <Route exact path="/comidas/:id" component={ Details } />
        <Route exact path="/bebidas/:id" component={ Details } />
        <Route
          exact
          path="/comidas/:id/in-progress"
          component={ ComidaEmProcesso }
        />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          component={ BebidaEmProcesso }
        />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidaOuBebida } />
        <Route exact path="/explorar/bebidas" component={ ExplorarComidaOuBebida } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExplorarPorIngredientes }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarPorIngredientes }
        />
        <Route exact path="/explorar/comidas/area" component={ ExplorarPorArea } />
        <Route exact path="/explorar/bebidas/area" component={ ExplorarPorArea } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
