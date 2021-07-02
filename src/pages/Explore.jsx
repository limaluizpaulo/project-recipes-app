import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Tela de explorar: /explorar;
export default function Explore({ history }) {
  const handleClick = ({ target }) => {
    if (target.name === 'food') {
      history.push('/explorar/comidas');
    } else {
      history.push('/explorar/bebidas');
    }
  };

  return (
    <div>
      <h4>Explore</h4>
      <Header history={ history } title="Explorar" />
      <button
        data-testid="explore-food"
        name="food"
        onClick={ handleClick }
        type="button"
      >
        Explorar Comidas
      </button>
      <button
        data-testid="explore-drinks"
        name="drinks"
        onClick={ handleClick }
        type="button"
      >
        Explorar Bebidas
      </button>
      <Footer />
    </div>
  );
}

Explore.propTypes = {
  history: PropTypes.shape().isRequired,
};
