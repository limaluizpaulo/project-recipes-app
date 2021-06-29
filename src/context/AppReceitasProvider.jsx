import React, { useState } from 'react';

export default function AppReceitasProvider(children) {
  const [login, setLogin] = useState({});

  const contextValue = {
    login,
    setLogin,
  };

  return (
    <AppReceitasProvider.Provider value={ contextValue }>
      { children }
    </AppReceitasProvider.Provider>
  );
}
