import React from 'react';
import Context from './Context';

export default function Provider() {
  const context = {};
  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}
