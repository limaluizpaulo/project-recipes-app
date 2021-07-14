import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explorar from './pages/Explorar';
import Perfil from './pages/Perfil';
import DetailsPage from './pages/DetailsPage';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import InProgressFoods from './pages/InProgressFoods';
import InProgressDrinks from './pages/InProgressDrinks';
import SearchFoods from './pages/SearchFoods';
import SearchDrinks from './pages/SearchDrinks';
import SearchFoodsIngredients from './pages/SearchFoodsIngredients';
import SearchDrinksIngredients from './pages/SearchDrinksIngredients';
import OrigensFoods from './pages/OrigensFoods';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/explorar" component={ Explorar } />
      <Route path="/perfil" component={ Perfil } />
      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route exact path="/comidas/:id" component={ DetailsPage } />
      <Route exact path="/bebidas/:id" component={ DetailsPage } />
      <Route
        exact
        path="/comidas/:id/in-progress"
        component={ InProgressFoods }
      />
      <Route
        path="/bebidas/:id/in-progress"
        component={ InProgressDrinks }
      />
      <Route
        exact
        path="/explorar/comidas"
        component={ SearchFoods }
      />
      <Route
        exact
        path="/explorar/bebidas"
        component={ SearchDrinks }
      />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ SearchFoodsIngredients }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ SearchDrinksIngredients }
      />
      <Route
        path="/explorar/comidas/area"
        component={ OrigensFoods }
      />
    </Switch>
  );
}

export default App;
