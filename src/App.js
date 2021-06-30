import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
<<<<<<< HEAD
<<<<<<< HEAD
import Comidas from './Pages/Comidas';
<<<<<<< HEAD
// import Switch from 'react-bootstrap/esm/Switch';
import Bebidas from './Pages/Bebidas';
import Explore from './Pages/Explore';
=======
>>>>>>> a59ba511cdbc0e47ddafe63a6601ccc623f819c7
=======
import Foods from './Pages/Foods';
import Drinks from './Pages/Drinks';
import Explore from './Pages/Explore';
>>>>>>> 2da4a2a9a64f2eaf7d472d77cbcdb64a18c05b72
=======
import Foods from './Pages/Foods';
import Drinks from './Pages/Drinks';
import Explore from './Pages/Explore';
>>>>>>> 4ef05975b7689a10a63a2103b325ad48b72258db

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Foods } />
        <Route path="/bebidas" component={ Drinks } />
        <Route path="/explorar" component={ Explore } />
      </Switch>

    </div>
  );
}

export default App;
