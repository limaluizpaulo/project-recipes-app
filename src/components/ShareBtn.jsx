import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

export default function ShareBtn({ pathname, doneRecipe, index }) {
  const [copyLink, setCopyLink] = useState(false);

  const handleClipBoard = () => {
    // Based on: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    const link = `http://localhost:3000${pathname}`;
    navigator.clipboard.writeText(link);
    setCopyLink(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ handleClipBoard }
      >
        <img
          src={ shareIcon }
          alt="share"
          data-testid={ doneRecipe ? `${index}-horizontal-share-btn` : 'share-btn' }
        />
      </button>
      {copyLink && <p>Link copiado!</p>}
    </div>
  );
}
ShareBtn.defaultProps = {
  doneRecipe: null,
  index: null,
};

ShareBtn.propTypes = {
  pathname: PropTypes.string.isRequired,
  doneRecipe: propTypes.bool,
  // recipe: PropTypes.shape({}).isRequired,
  index: PropTypes.number,
};
