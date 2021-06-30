import React, { useState } from 'react';
import SearchBar from './SearchBar';

export default function Headerr() {
  const [btn, setBtn] = useState(false);

  return (
    <>
      <div>
        <button
          type="button"
          data-testid="search-top-btn"
          onClick={ () => setBtn(!btn) }
        >
          toggle

        </button>
      </div>

      { !btn ? '' : <SearchBar />}
    </>
  );
}
