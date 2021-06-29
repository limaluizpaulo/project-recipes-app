import React, { createContext, useState } from 'react';

export const Context = createContext();

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const object = {
    email,
    setEmail,
    pass,
    setPass,
  };

  return (
    <Context.Provider value={ object }>
      { children }
    </Context.Provider>
  );
}

export default Provider;
