import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/explore.css';

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
    <>
      <Header history={ history } title="Explorar" />
      <div className="explorePage">
        <button
          className="explore__button"
          data-testid="explore-food"
          name="food"
          onClick={ handleClick }
          type="button"
        >
          Explorar Comidas
        </button>
        <button
          className="explore__button"
          data-testid="explore-drinks"
          name="drinks"
          onClick={ handleClick }
          type="button"
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </>
  );
}

Explore.propTypes = {
  history: PropTypes.shape().isRequired,
};
