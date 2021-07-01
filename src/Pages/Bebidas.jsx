import React, { useContext } from 'react';
import Context from '../context/Context';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

export default function Bebidas() {
  const { openSearchBar } = useContext(Context);

  return (
    <div>
      <Header />
      { openSearchBar ? <SearchBar /> : null }
      <Footer />
    </div>
  );
}
