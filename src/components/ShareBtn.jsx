import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import FetchContext from '../context/FetchContext';
import shareIcon from '../images/shareIcon.svg';

function ShareBtn({ id }) {
  const { typeFunc } = useContext(FetchContext);
  const [msg, setMsg] = useState(false);

  const shareLink = () => {
    if (typeFunc === 'meals') {
      copy(`http://localhost:3000/comidas/${id}`);
    } else {
      copy(`http://localhost:3000/bebidas/${id}`);
    }

    setMsg(true);

    const TWO_SECONDS = 2000;
    setTimeout(() => {
      setMsg(false);
    }, TWO_SECONDS);
  };

  return (
    <div>
      { msg && <div>Link copiado!</div>}
      <button data-testid="share-btn" type="button" onClick={ shareLink }>
        <img src={ shareIcon } alt="botão de compartilhar" />
      </button>
    </div>
  );
}

ShareBtn.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ShareBtn;
