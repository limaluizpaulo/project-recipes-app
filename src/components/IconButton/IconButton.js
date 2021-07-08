import React from 'react';

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

export default IconButton;
