import React from 'react';
import PropTypes from 'prop-types';

const ExploreAreaButton = ({ history }) => {
  const handleClick = () => {
    history.push('/explorar/comidas/area');
  };

  return (
    <button
      data-testid="explore-by-area"
      onClick={ handleClick }
      type="button"
    >
      Por Local de Origem
    </button>
  );
};

ExploreAreaButton.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ExploreAreaButton;
