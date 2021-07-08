import React from 'react';
import PropTypes from 'prop-types';

function IconButton({ onClick, dataTest, src, alt }) {
  return (
    <button
      type="button"
      onClick={ onClick }
    >
      <img data-testid={ dataTest } src={ src } alt={ alt } />
    </button>
  );
}

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  dataTest: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default IconButton;
