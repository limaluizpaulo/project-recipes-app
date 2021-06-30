import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

function SearchProvider({ children }) {
  const [inputSearch, setInputSearch] = useState('');
  const [radio, setRadio] = useState();

  const objectContext = {
    inputSearch,
    setInputSearch,
    radio,
    setRadio,
  };

  return (
    <SearchContext.Provider value={ objectContext }>
      { children }
    </SearchContext.Provider>
  );
}

export default SearchProvider;
