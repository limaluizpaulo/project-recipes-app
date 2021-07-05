import React from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

const ShareButton = ({ type, id, changeCopy, index }) => (
  <button
    type="button"
    onClick={ () => {
      clipboardCopy(`http://localhost:3000/${type}s/${id}`);
      changeCopy(true);
    } }
  >
    <img
      src={ shareIcon }
      alt=""
      data-testid={ `${index}-horizontal-share-btn` }
    />
  </button>
);

ShareButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  changeCopy: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,

};

export default ShareButton;
