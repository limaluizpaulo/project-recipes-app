import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareBtn({ showCopiedMsg }) {
  const copyLink = () => {
    copy(window.location.href.replace('/in-progress', ''));
    showCopiedMsg(true);
  };

  return (
    <button
      type="button"
      data-testid="share-btn"
      onClick={ copyLink }
    >
      <img src={ shareIcon } className="small-btn" alt="Ícone de compartilhar" />
    </button>
  );
}

ShareBtn.propTypes = {
  showCopiedMsg: PropTypes.func,
}.isRequeride;

export default ShareBtn;
