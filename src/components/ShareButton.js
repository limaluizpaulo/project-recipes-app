import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

const ShareButton = ({ url, msgShare, idTest }) => {
  const [msgCopy, setMsgCopy] = useState(false);
  return (
    <button
      data-testid={ idTest }
      onClick={ () => copy(url).then(() => setMsgCopy(true)) }
      type="button"
    >
      {msgCopy ? 'Link copiado!' : msgShare }
    </button>
  );
};

ShareButton.defaultProps = {
  msgShare: '',
};

ShareButton.propTypes = {
  url: PropTypes.string.isRequired,
  idTest: PropTypes.string.isRequired,
  msgShare: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default ShareButton;
