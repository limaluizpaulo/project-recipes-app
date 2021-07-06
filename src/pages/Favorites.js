import React from 'react';

import Header from '../components/Header';

function Favorites() {
  return (
    <div>
      <Header title="Receitas Favoritas" showSearchIcon={ false } />
      <p>ReceitasFavoritas</p>
    </div>
  );
}

export default Favorites;
