import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoodsArea from './pages/ExploreFoodsArea';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipesDone from './pages/RecipesDone';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ Login } />
      <Route exact path="/Comidas" component={ Foods } />
      <Route exact path="/Bebidas" component={ Drinks } />
    </BrowserRouter>
  );
}

export default App;

// return (
//   <div className="meals">
//     <span className="logo">TRYBE</span>
//     <object
//       className="rocksGlass"
//       type="image/svg+xml"
//       data={ rockGlass }
//     >
//       Glass
//     </object>
//   </div>
// );
