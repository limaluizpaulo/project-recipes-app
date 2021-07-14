import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { FiCopy } from 'react-icons/fi';

function ShareBtn({ showCopiedMsg, testId, type, id, route }) {
  const copyLink = () => {
    copy(window.location.href.replace(route, `${type}/${id}`));
    showCopiedMsg(true);
  };

  return (
    <button type="button" onClick={ copyLink }>
      <FiCopy />
    </button>
  );
}

ShareBtn.propTypes = {
  showCopiedMsg: PropTypes.func,
}.isRequeride;

export default ShareBtn;
