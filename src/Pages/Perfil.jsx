import React, { useContext } from 'react';
import Context from '../context/Context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

export default function Perfil() {
  const { openSearchBar } = useContext(Context);

  return (
    <div>
      <Header title="Perfil" />
      { openSearchBar ? <SearchBar /> : null }
      <Footer />
    </div>
  );
}
