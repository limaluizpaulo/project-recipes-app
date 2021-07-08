import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import { UserContext } from '../context/UserProvider';

const ShareButton = ({ type, id, test }) => {
  const { copyToClipboard } = useContext(UserContext);

  return (
    <button
      type="button"
      onClick={ () => {
        clipboardCopy(`http://localhost:3000/${type}s/${id}`);
        copyToClipboard();
      } }
    >
      <img
        src={ shareIcon }
        alt=""
        data-testid={ test }
      />
    </button>
  );
};

ShareButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  test: PropTypes.string.isRequired,
};

export default ShareButton;
