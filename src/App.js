import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ Login } />
      <Route exact path="/Comidas" component={ Comidas } />
      <Route exact path="/Bebidas" component={ Bebidas } />
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
