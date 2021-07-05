import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function DoneShareBtn({ showCopiedMsg }) {
  const copyLink = () => {
    copy(window.location.href.replace('/receitas-feitas', ''));
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

DoneShareBtn.propTypes = {
  showCopiedMsg: PropTypes.func,
}.isRequeride;

export default DoneShareBtn;
