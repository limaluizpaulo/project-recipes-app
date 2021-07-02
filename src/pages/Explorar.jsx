import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explorar() {
  Explorar.displayName = 'Explorar';
  return (
    <div>
      <Header title={ Explorar.displayName } />
      <Footer />
    </div>
  );
}

export default Explorar;
