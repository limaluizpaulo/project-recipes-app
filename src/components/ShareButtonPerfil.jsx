import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ShareButtonPerfil({ type, id, index }) {
  const [msgCopy, setMsgCopy] = useState(false);

  const TWO_SECONDS = 2000;
  const shareLink = () => {
    let url = '';
    if (type === 'comida') {
      url = `http://localhost:3000/comidas/${id}`;
      copy(url);
    } else {
      url = `http://localhost:3000/bebidas/${id}`;
      copy(url);
    }
    setMsgCopy(!msgCopy);
    setTimeout(() => {
      setMsgCopy(false);
    }, TWO_SECONDS);
  };
  return (
    <main>
      <div>
        {msgCopy ? 'Link copiado!' : ''}
      </div>
      <button type="button" onClick={ shareLink }>
        <img
          src={ shareIcon }
          alt="botão de compartilhar"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
    </main>
  );
}
