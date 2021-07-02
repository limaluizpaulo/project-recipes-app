import React from 'react';
import PropTypes from 'prop-types';

const ExploreIngredientButton = ({ history }) => {
  const handleClick = () => {
    const path = history.location.pathname;
    if (path === '/explorar/comidas') {
      history.push('/explorar/comidas/ingredientes');
    } else {
      history.push('/explorar/bebidas/ingredientes');
    }
  };

  return (
    <button
      data-testid="explore-by-ingredient"
      onClick={ handleClick }
      type="button"
    >
      Por Ingredientes
    </button>
  );
};

ExploreIngredientButton.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ExploreIngredientButton;
