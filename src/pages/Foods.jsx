import React from 'react';
import Header from '../components/Header';

function Foods() {
  Foods.displayName = 'Comidas';
  return (
    <div>
      <Header title={ Foods.displayName } />
    </div>
  );
}

export default Foods;
