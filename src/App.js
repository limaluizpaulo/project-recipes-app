import React from 'react';
import './App.css';

import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginProvider from './context/LoginProvider';
import DrinksProvider from './context/DrinksProvider';
import RecipesProvider from './context/RecipesProvider';

function App() {
  return (
    <LoginProvider>
      <DrinksProvider>
        <RecipesProvider>
          <div className="meals">
            <span className="logo">TRYBE</span>
            <object
              className="rocksGlass"
              type="image/svg+xml"
              data={ rockGlass }
            >
              Glass
            </object>
          </div>
        </RecipesProvider>
      </DrinksProvider>
    </LoginProvider>
  );
}

export default App;
