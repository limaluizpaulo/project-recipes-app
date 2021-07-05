import React from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Footer } from '../components';

const Explore = () => {
  const history = useHistory();

  return (
    <main>
      <Header name="Explorar" />
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
    </main>
  );
};

export default Explore;
