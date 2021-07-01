import React from 'react';
import PropTypes from 'prop-types';

const ExploreSurpriseButton = ({ history }) => {
  const handleClick = () => {
    console.log(history);
  };

  return (
    <button
      data-testid="explore-surprise"
      onClick={ handleClick }
      type="button"
    >
      Me Surpreenda!
    </button>
  );
};

ExploreSurpriseButton.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ExploreSurpriseButton;
