import React, { useState } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function ShareBtn(params) {
  const { type, id, index } = params;
  const food = '/comidas/';
  const drink = '/bebidas/';
  const [copied, setCopied] = useState(false);

  function copyUrl() {
    setCopied(true);
    console.log(type);
    if (type === 'comida') {
      copy(`http://localhost:3000${food}${id}`);
    } else {
      copy(`http://localhost:3000${drink}${id}`);
    }
    // return console.log('alcool', type);
  }

  return (
    <div>
      <button
        onClick={ copyUrl }
        src={ shareIcon }
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
      >
        <img src={ shareIcon } alt="compartilhar receita" />
      </button>
      { copied ? <span>Link copiado!</span> : '' }
    </div>
  );
}
