import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/Provider';
import Login from './Pages/Login';

function App() {
  return (
    <Provider>
      <Login />
    </Provider>
  );
}

export default App;
