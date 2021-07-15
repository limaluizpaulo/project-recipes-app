import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { copyLinkDoneRecipes } from '../services/functions';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButtonDoneRecipes({ templateString, index }) {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <div>
      <Button
        variant="outline-warning"
        type="button"
        onClick={ () => setIsCopied(
          copyLinkDoneRecipes(templateString, isCopied),
        ) }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="shareIcon"
        />
      </Button>
      {isCopied ? <p>Link copiado!</p> : null }
    </div>
  );
}

ShareButtonDoneRecipes.propTypes = {
  templateString: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
