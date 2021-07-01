import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Foods } />
      <Route path="/bebidas" component={ Drinks } />
    </Switch>
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
