import React from 'react';
import Footer from '../components/Footer';
import HeaderSearch from '../components/Header';

function OrigensFoods() {
  OrigensFoods.displayName = 'Explorar Origem';
  return (
    <div>
      <HeaderSearch title={ OrigensFoods.displayName } />
      <Footer />
    </div>
  );
}

export default OrigensFoods;
