import React from 'react';
import './App.css';

import Routes from './routes/routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginProvider from './context/LoginProvider';
import DrinksProvider from './context/DrinksProvider';
import RecipesProvider from './context/RecipesProvider';

function App() {
  return (
    <LoginProvider>
      <DrinksProvider>
        <RecipesProvider>
          <Routes />
        </RecipesProvider>
      </DrinksProvider>
    </LoginProvider>
  );
}

export default App;
