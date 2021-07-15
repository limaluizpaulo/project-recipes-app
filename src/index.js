import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import RecipeProvider from './context/Provider';

ReactDOM.render(
  <RecipeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecipeProvider>,
  document.getElementById('root'),
);
