import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import { UserContext } from '../context/UserProvider';

const ShareButton = ({ type, id, index = 0 }) => {
  const { copyToClipboard } = useContext(UserContext);

  return (
    <button
      type="button"
      data-testid="share-btn"
      onClick={ () => {
        clipboardCopy(`http://localhost:3000/${type}s/${id}`);
        copyToClipboard();
      } }
    >
      <img
        src={ shareIcon }
        alt=""
        data-testid={ `${index}-horizontal-share-btn` }
      />
    </button>
  );
};

ShareButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default ShareButton;
