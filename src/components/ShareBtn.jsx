import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

export default function ShareBtn({ pathname, recipe, doneRecipe, index }) {
  const [copyLink, setCopyLink] = useState(false);

  // Based on: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard

  const FINAL_INDEX = -12;
  const PATH_LENGTH = 15;

  const handleClipBoard = () => {
    console.log(doneRecipe);
    let link = '';
    if (!doneRecipe) {
      link = `http://localhost:3000${pathname.length > PATH_LENGTH ? pathname.substr(0, pathname.length).slice(0, FINAL_INDEX) : pathname}`;
    } else {
      link = `http://localhost:3000/${recipe.type}s/${recipe.id}`;
    }

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
  pathname: null,

};

ShareBtn.propTypes = {
  pathname: PropTypes.string,
  doneRecipe: PropTypes.bool,
  recipe: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  index: PropTypes.number,
};
