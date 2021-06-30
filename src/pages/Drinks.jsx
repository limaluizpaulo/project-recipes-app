import React from 'react';
import Header from '../components/Header';

function Drinks() {
  Drinks.displayName = 'Bebidas';
  return (
    <div>
      <Header title={ Drinks.displayName } />
    </div>
  );
}

export default Drinks;
