import React from 'react';

import Header from '../components/Header';

function Favorites() {
  return (
    <main>
      <Header title="Receitas Favoritas" showSearchIcon={ false } />
      <p>ReceitasFavoritas</p>
    </main>
  );
}

export default Favorites;
