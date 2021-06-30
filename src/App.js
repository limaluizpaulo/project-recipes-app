import React from 'react';
import Login from './common/pages/Login';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Login />
    </Provider>
  );
}

export default App;
