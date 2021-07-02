import React, { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';
import HeaderSearchBar from './HeaderSearchBar';

function HeaderSearchButton({ baseEndPoint }) {
  const [renderButton, setRenderButton] = useState(false);

  return (
    <>
      <button type="button" onClick={ () => { setRenderButton(!renderButton); } }>
        <img
          src={ searchIcon }
          alt="search icon"
          data-testid="search-top-btn"
        />
      </button>
      {renderButton ? <HeaderSearchBar baseEndPoint={ baseEndPoint } /> : null}
    </>
  );
}

export default HeaderSearchButton;
