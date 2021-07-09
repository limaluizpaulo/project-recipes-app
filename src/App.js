import React, { useContext } from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import UserContext from './context/user.context';
import WarningMessage from './components/WarningMessage';
import Login from './pages/Login';
import Main from './pages/Main';
import Details from './pages/Details';
import InProgress from './pages/InProgress';
import Explore from './pages/explore';
import ExploreByType from './pages/explore/ExploreByType';
import ExploreByIngredients from './pages/explore/ExploreByIngredients';
import ExploreByArea from './pages/explore/ExploreByArea';
import Profile from './pages/Profile';
import Done from './pages/Done';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  const { warningMessage } = useContext(UserContext);
  return (
    <BrowserRouter>
      {warningMessage && <WarningMessage />}
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Main } />
        <Route exact path="/bebidas" component={ Main } />
        <Route exact path="/comidas/:id" component={ Details } />
        <Route exact path="/bebidas/:id" component={ Details } />
        <Route exact path="/comidas/:id/in-progress" component={ InProgress } />
        <Route exact path="/bebidas/:id/in-progress" component={ InProgress } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreByType } />
        <Route exact path="/explorar/bebidas" component={ ExploreByType } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreByIngredients }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreByIngredients }
        />
        <Route exact path="/explorar/comidas/area" component={ ExploreByArea } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ Done } />
        <Route exact path="/receitas-favoritas" component={ Favorites } />
        <Route component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
