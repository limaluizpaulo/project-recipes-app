import React from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Explore() {
  const { push } = useHistory();

  return (
    <main className="control-buttons-page">
      <Header title="Explore" showSearchIcon={ false } />
      <section className="control-buttons-container">
        <button
          type="button"
          className="control-button"
          onClick={ () => { push('/explorar/comidas'); } }
        >
          Explore Meals
        </button>
        <button
          type="button"
          className="control-button"
          onClick={ () => { push('/explorar/bebidas'); } }
        >
          Explore Drinks
        </button>
      </section>
      <Footer />
    </main>
  );
}

export default Explore;
