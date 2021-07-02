import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  Perfil.displayName = 'Perfil';
  return (
    <div>
      <Header title={ Perfil.displayName } />
      <Footer />
    </div>
  );
}

export default Perfil;
