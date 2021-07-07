import React from 'react';
import { useHistory } from 'react-router';

import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explore() {
  const history = useHistory();
  return (
    <div>
      <Header title="Explorar" display="false" />
      <button
        type="button"
        data-testid="explore-food"
        onClick={ () => history.push('/explorar/comidas') }
      >
        Explorar Comidas
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => history.push('/explorar/bebidas') }
      >
        Explorar Bebidas
      </button>
      <Footer />
    </div>
  );
}
