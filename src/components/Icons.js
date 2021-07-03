import React, { useState } from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../styles/global.css';

function Icons() {
  const [changeIcon, setChangeIcon] = useState(true);

  return (
    <div className="shareAndLike">
      <button type="button" className="share">
        <img
          src={ shareIcon }
          alt="share icon"
          data-testid="share-btn"
        />
      </button>
      <button
        type="button"
        className="favorite"
        onClick={ () => setChangeIcon(!changeIcon) }
      >
        <img
          src={ changeIcon ? whiteHeartIcon : blackHeartIcon }
          alt="favorite icons"
          data-testid="favorite-btn"
        />
      </button>
    </div>
  );
}

export default Icons;
