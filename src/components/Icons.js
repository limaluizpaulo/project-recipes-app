import React, { useState } from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../styles/global.css';

function Icons() {
  const [changeIcon, setChangeIcon] = useState(true);
  const [changeCopy, setChangeCopy] = useState(false);

  function copyClipboard() {
    const url = document.URL;
    navigator.clipboard.writeText(url);
    setChangeCopy(!changeCopy);
  }

  return (
    <div>
      <div className="shareAndLike">
        <button
          type="button"
          className="share"
          onClick={ copyClipboard }
        >
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
      { changeCopy }
    </div>
  );
}

export default Icons;
