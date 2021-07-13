import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Explore() {
  const history = useHistory();
  return (
    <div>
      <Header title="Explorar" />
      <div>
        <button
          data-testid="explore-food"
          type="button"
          onClick={ () => (
            history.push('/explorar/comidas')
          ) }
        >
          Explorar Comidas
        </button>
        <button
          data-testid="explore-drinks"
          type="button"
          onClick={ () => (
            history.push('/explorar/bebidas')
          ) }
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
