import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import LoginProvider from './context/LoginProvider';
import DrinksProvider from './context/DrinksProvider';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';

function App() {
  return (
    <LoginProvider>
      <DrinksProvider>
        <RecipesProvider>
          <Login />
        </RecipesProvider>
      </DrinksProvider>
    </LoginProvider>
  );
}

export default App;
