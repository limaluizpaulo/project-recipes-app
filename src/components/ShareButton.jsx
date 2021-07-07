import React, { useState } from 'react';
import { useLocation } from 'react-router';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ShareButton() {
  const [msgCopy, setMsgCopy] = useState(false);
  const { pathname } = useLocation();
  const TWO_SECONDS = 3000;
  const shareLink = () => {
    const url = `http://localhost:3000${pathname}`;
    copy(url);
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
      <button type="button" data-testid="share-btn" onClick={ shareLink }>
        <img src={ shareIcon } alt="botão de compartilhar" />
      </button>
    </main>
  );
}
