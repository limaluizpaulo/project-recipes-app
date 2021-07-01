import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';

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
