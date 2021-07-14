import React, { useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

const TREE_SECONDS = 3000;

function ButtonShare({ path, dataTest }) {
  const [showMsg, setShowMsg] = useState(false);
  const exibeText = () => {
    setShowMsg(true);
    setTimeout(() => {
      setShowMsg(false);
    }, TREE_SECONDS);
  };

  return (
    <div>
      {showMsg && <span>Link copiado!</span>}
      <button
        type="button"
        onClick={ async () => {
          exibeText();
          await copy(path);
        } }
      >
        <img
          src={ shareIcon }
          alt="share"
          data-testid={ dataTest }
        />
      </button>
    </div>
  );
}

ButtonShare.propTypes = {
  path: PropTypes.string.isRequired,
  dataTest: PropTypes.string.isRequired,
};

export default ButtonShare;
