import React from 'react';
import shareIcon from '../images/shareIcon.svg';

export default function ShareBtn() {
  return (
    <div>
      <button type="button">
        <img src={ shareIcon } alt="share" data-testid="share-btn" />
      </button>
    </div>
  );
}
