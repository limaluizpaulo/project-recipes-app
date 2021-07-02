import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareBtn({ showCopiedMsg, testId }) {
  const copyLink = () => {
    copy(window.location.href.replace('/in-progress', ''));
    showCopiedMsg(true);
  };

  return (
    <button type="button" onClick={ copyLink }>
      <img
        src={ shareIcon }
        className="small-btn"
        alt="Ícone de compartilhar"
        data-testid={ testId }
      />
    </button>
  );
}

ShareBtn.propTypes = {
  showCopiedMsg: PropTypes.func,
}.isRequeride;

export default ShareBtn;
