import React from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Explore() {
  const history = useHistory();
  return (
    <main>
      <Header title="Explorar" showSearchIcon={ false } />
      <button
        type="button"
        onClick={ () => { history.push('/explorar/comidas'); } }
      >
        Explorar Comidas
      </button>
      <button
        type="button"
        onClick={ () => { history.push('/explorar/bebidas'); } }
      >
        Explorar Bebidas
      </button>
      <Footer />
    </main>
  );
}

export default Explore;
