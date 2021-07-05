import React, { useRef, useState } from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../styles/global.css';

function Icons() {
  const [changeIcon, setChangeIcon] = useState(true);
  const [changeCopy, setChangeCopy] = useState(false);
  const target = useRef(null);

  const DOISMIL = 2000;

  function copyClipboard() {
    const url = document.URL;
    navigator.clipboard.writeText(url);
    setChangeCopy(true);
    setTimeout(() => {
      setChangeCopy(false);
    }, [DOISMIL]);
  }

  function speakCopy() {
    return (
      <Overlay target={ target.current } show={ changeCopy } placement="bottom">
        {(props) => (
          <Tooltip id="overlay" { ...props }>
            Link copiado!
          </Tooltip>
        )}
      </Overlay>
    );
  }

  console.log(speakCopy);

  return (
    <div>
      <div className="shareAndLike">
        <button
          ref={ target }
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
      { changeCopy && <p>Link copiado!</p> }
    </div>
  );
}

export default Icons;
